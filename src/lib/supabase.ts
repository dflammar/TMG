// ── Supabase Client ──────────────────────────────────────────
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Public client (browser safe)
export const supabase = createClient(supabaseUrl || "https://placeholder.supabase.co", supabaseAnonKey || "placeholder");

// Admin client (server only)
export const supabaseAdmin = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseServiceKey || supabaseAnonKey || "placeholder"
);

// ── Database Schema SQL (run once in Supabase SQL editor) ────
/*
CREATE TABLE IF NOT EXISTS applications (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id       text UNIQUE NOT NULL,
  full_name    text NOT NULL,
  phone        text NOT NULL,
  email        text,
  experience   text NOT NULL,
  job_title    text NOT NULL,
  job_id       text NOT NULL,
  cv_url       text,
  status       text DEFAULT 'pending' CHECK (status IN ('pending','reviewing','interview','accepted','rejected')),
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS status_history (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES applications(id) ON DELETE CASCADE,
  status         text NOT NULL,
  note_en        text,
  note_ar        text,
  changed_at     timestamptz DEFAULT now()
);

-- Storage bucket for CVs
INSERT INTO storage.buckets (id, name, public) VALUES ('cvs', 'cvs', false) ON CONFLICT DO NOTHING;
*/
