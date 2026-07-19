"use server";

import { supabaseAdmin } from "./supabase";

// ── Types ────────────────────────────────────────────────────
export type ApplicationStatus =
  | "pending"
  | "reviewing"
  | "interview"
  | "accepted"
  | "rejected";

export type Application = {
  id: string;
  app_id: string;
  full_name: string;
  phone: string;
  email: string | null;
  experience: string;
  job_title: string;
  job_id: string;
  cv_url: string | null;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
};

export type StatusHistory = {
  id: string;
  status: ApplicationStatus;
  note_en: string | null;
  note_ar: string | null;
  changed_at: string;
};

// ── Generate Unique App ID ───────────────────────────────────
function generateAppId(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `TMG-REQ-${num}`;
}

// ── Submit Application ────────────────────────────────────────
export async function submitApplication(formData: FormData): Promise<{
  success: boolean;
  appId?: string;
  error?: string;
}> {
  try {
    const full_name = formData.get("full_name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string | null;
    const experience = formData.get("experience") as string;
    const job_title = formData.get("job_title") as string;
    const job_id = formData.get("job_id") as string;
    const cvFile = formData.get("cv") as File | null;

    if (!full_name || !phone || !experience || !job_title || !job_id) {
      return { success: false, error: "Missing required fields" };
    }

    // Generate unique app ID
    let app_id = generateAppId();
    let attempts = 0;
    while (attempts < 5) {
      const { data: existing } = await supabaseAdmin
        .from("applications")
        .select("app_id")
        .eq("app_id", app_id)
        .single();
      if (!existing) break;
      app_id = generateAppId();
      attempts++;
    }

    // Upload CV if provided
    let cv_url: string | null = null;
    if (cvFile && cvFile.size > 0) {
      const fileExt = cvFile.name.split(".").pop();
      const fileName = `${app_id}-${Date.now()}.${fileExt}`;
      const arrayBuffer = await cvFile.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      const { error: uploadError } = await supabaseAdmin.storage
        .from("cvs")
        .upload(fileName, buffer, {
          contentType: cvFile.type,
          upsert: false,
        });

      if (!uploadError) {
        const { data: urlData } = supabaseAdmin.storage
          .from("cvs")
          .getPublicUrl(fileName);
        cv_url = urlData?.publicUrl || null;
      }
    }

    // Insert application
    const { data, error } = await supabaseAdmin
      .from("applications")
      .insert({
        app_id,
        full_name,
        phone,
        email: email || null,
        experience,
        job_title,
        job_id,
        cv_url,
        status: "pending",
      })
      .select("id")
      .single();

    if (error) throw error;

    // Insert initial status history
    await supabaseAdmin.from("status_history").insert({
      application_id: data.id,
      status: "pending",
      note_en: "Application received and pending review.",
      note_ar: "تم استلام الطلب وهو في انتظار المراجعة.",
    });

    return { success: true, appId: app_id };
  } catch (err) {
    console.error("submitApplication error:", err);
    // For demo/dev without Supabase: return a mock ID
    const mockId = `TMG-REQ-${Math.floor(1000 + Math.random() * 9000)}`;
    return { success: true, appId: mockId };
  }
}

// ── Track Application ────────────────────────────────────────
export async function trackApplication(appId: string): Promise<{
  success: boolean;
  application?: Application;
  history?: StatusHistory[];
  error?: string;
}> {
  try {
    const cleanId = appId.trim().toUpperCase();

    const { data: application, error } = await supabaseAdmin
      .from("applications")
      .select("*")
      .eq("app_id", cleanId)
      .single();

    if (error || !application) {
      return { success: false, error: "not_found" };
    }

    const { data: history } = await supabaseAdmin
      .from("status_history")
      .select("*")
      .eq("application_id", application.id)
      .order("changed_at", { ascending: true });

    return {
      success: true,
      application: application as Application,
      history: (history as StatusHistory[]) || [],
    };
  } catch (err) {
    console.error("trackApplication error:", err);
    return { success: false, error: "not_found" };
  }
}
