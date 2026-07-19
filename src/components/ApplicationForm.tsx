"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitApplication } from "@/lib/actions";
import { Upload, CheckCircle2, Copy, Check, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import type { Job } from "@/lib/jobs-data";

type Lang = "en" | "ar";

type ApplicationFormProps = {
  job: Job;
  lang: Lang;
  messages: Record<string, string>;
};

export default function ApplicationForm({ job, lang, messages: msg }: ApplicationFormProps) {
  const isAr = lang === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const formRef = useRef<HTMLFormElement>(null);

  const [submitting, setSubmitting] = useState(false);
  const [appId, setAppId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [cvName, setCvName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const jobTitle = isAr ? job.title_ar : job.title_en;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      formData.set("job_title", jobTitle);
      formData.set("job_id", job.id);

      const result = await submitApplication(formData);
      if (result.success && result.appId) {
        setAppId(result.appId);
        formRef.current?.reset();
        setCvName("");
      } else {
        setError(result.error || "Submission failed. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function copyId() {
    if (!appId) return;
    navigator.clipboard.writeText(appId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  // ── Success Screen ──────────────────────────────────────────
  if (appId) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center py-12 px-6"
        dir={isAr ? "rtl" : "ltr"}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-green-50 border-4 border-green-100 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 size={36} className="text-green-500" />
        </motion.div>

        <h2 className={`font-display font-bold text-navy-900 text-2xl mb-3 ${isAr ? "font-arabic" : ""}`}>
          {msg.success_title}
        </h2>
        <p className={`text-navy-700/60 text-sm mb-8 max-w-sm mx-auto ${isAr ? "font-arabic" : ""}`}>
          {msg.success_subtitle}
        </p>

        {/* Application ID Box */}
        <div className="inline-block bg-navy-950 rounded-2xl p-6 mb-8 max-w-sm w-full">
          <p className="text-white/50 text-xs mb-2 tracking-wider uppercase">
            {msg.success_id_label}
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-gold-400 font-display font-bold text-3xl tracking-wider" dir="ltr">
              {appId}
            </span>
            <button
              onClick={copyId}
              className="p-2 rounded-lg bg-white/10 hover:bg-gold-500/20 transition-colors text-white/60 hover:text-gold-400"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/${lang}/track?id=${appId}`}
            className="btn-primary justify-center text-sm"
          >
            {msg.success_track}
            <ArrowIcon size={15} />
          </Link>
          <Link href={`/${lang}/careers`} className="btn-navy justify-center text-sm">
            {msg.success_back}
          </Link>
        </div>
      </motion.div>
    );
  }

  // ── Form ────────────────────────────────────────────────────
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      dir={isAr ? "rtl" : "ltr"}
      className="space-y-5"
    >
      {/* Applying for */}
      <div className="p-4 rounded-xl bg-gold-500/8 border border-gold-500/20">
        <p className={`text-gold-700 text-xs font-semibold uppercase tracking-wider mb-1 ${isAr ? "font-arabic" : ""}`}>
          {msg.title}
        </p>
        <p className={`text-navy-900 font-semibold ${isAr ? "font-arabic" : ""}`}>{jobTitle}</p>
      </div>

      {/* Full Name */}
      <div>
        <label className={`block text-navy-800 text-sm font-semibold mb-2 ${isAr ? "font-arabic" : ""}`}>
          {msg.form_name} <span className="text-red-400">*</span>
        </label>
        <input
          name="full_name"
          type="text"
          required
          placeholder={msg.form_name_ph}
          className="input-field"
        />
      </div>

      {/* Phone + Email row */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={`block text-navy-800 text-sm font-semibold mb-2 ${isAr ? "font-arabic" : ""}`}>
            {msg.form_phone} <span className="text-red-400">*</span>
          </label>
          <input
            name="phone"
            type="tel"
            required
            placeholder={msg.form_phone_ph}
            className="input-field"
            dir="ltr"
          />
        </div>
        <div>
          <label className={`block text-navy-800 text-sm font-semibold mb-2 ${isAr ? "font-arabic" : ""}`}>
            {msg.form_email}
          </label>
          <input
            name="email"
            type="email"
            placeholder={msg.form_email_ph}
            className="input-field"
            dir="ltr"
          />
        </div>
      </div>

      {/* Experience */}
      <div>
        <label className={`block text-navy-800 text-sm font-semibold mb-2 ${isAr ? "font-arabic" : ""}`}>
          {msg.form_exp} <span className="text-red-400">*</span>
        </label>
        <textarea
          name="experience"
          required
          rows={3}
          placeholder={msg.form_exp_ph}
          className="input-field resize-none"
        />
      </div>

      {/* CV Upload */}
      <div>
        <label className={`block text-navy-800 text-sm font-semibold mb-2 ${isAr ? "font-arabic" : ""}`}>
          {msg.form_cv}
        </label>
        <label className="group flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:border-gold-400 hover:bg-gold-50/30 cursor-pointer transition-all duration-200">
          <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
            <Upload size={20} className="text-gold-600" />
          </div>
          <div className="text-center">
            <span className={`text-navy-800 text-sm font-medium block ${isAr ? "font-arabic" : ""}`}>
              {cvName || (isAr ? "اضغط لاختيار الملف" : "Click to upload your CV")}
            </span>
            <span className={`text-gray-400 text-xs mt-1 block ${isAr ? "font-arabic" : ""}`}>
              {msg.form_cv_hint}
            </span>
          </div>
          <input
            name="cv"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setCvName(file ? file.name : "");
            }}
          />
        </label>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-500 text-sm text-center"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-navy-900 text-white font-semibold text-sm hover:bg-gold-500 hover:text-navy-900 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-gold-500/30"
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span className={isAr ? "font-arabic" : ""}>{msg.form_submitting}</span>
          </>
        ) : (
          <>
            <span className={isAr ? "font-arabic" : ""}>{msg.form_submit}</span>
            <ArrowIcon size={16} />
          </>
        )}
      </button>
    </form>
  );
}
