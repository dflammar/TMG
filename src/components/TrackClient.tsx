"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Loader2, AlertCircle, User, MapPin, Calendar,
  CreditCard, Mail, Clock, CheckCircle2, UserCheck,
  Building2, Send, ChevronRight
} from "lucide-react";

type Lang = "en" | "ar";

type TrackClientProps = {
  lang: Lang;
  messages: Record<string, string>;
  initialId?: string;
};

// ── Mock Database ─────────────────────────────────────────────
const MOCK_RECORDS: Record<string, MockRecord> = {
  "30302210200232": {
    national_id:    "30302210200232",
    full_name:      "عمرو عزت محمد حسين المنجد",
    full_name_en:   "Amr Ezzat Mohamed Hussein El-Monjed",
    address:        "الإسكندرية ـ ثان المنتزه ـ شارع المعهد الديني ـ العصافرة 9",
    birthdate:      "21/02/2003",
    email:          "amrtmgnow18726@gmail.com",
    status:         "reviewing",
    registered_by:  "HR بدر محمد علام أحمد",
    registered_at:  "18/07/2026",
    interview_location: null,
    interview_date:     null,
  },
};

type MockRecord = {
  national_id:        string;
  full_name:          string;
  full_name_en:       string;
  address:            string;
  birthdate:          string;
  email:              string;
  status:             "pending" | "reviewing" | "interview" | "accepted" | "rejected";
  registered_by:      string;
  registered_at:      string;
  interview_location: string | null;
  interview_date:     string | null;
};

// ── Status Config ─────────────────────────────────────────────
const STATUS_CONFIG = {
  pending:   { labelAr: "في انتظار المراجعة",  labelEn: "Pending Review",       color: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A" },
  reviewing: { labelAr: "قيد المراجعة",         labelEn: "Under Review",         color: "#3B82F6", bg: "#EFF6FF", border: "#BFDBFE" },
  interview: { labelAr: "تم جدولة المقابلة",    labelEn: "Interview Scheduled",  color: "#8B5CF6", bg: "#F5F3FF", border: "#DDD6FE" },
  accepted:  { labelAr: "مقبول",               labelEn: "Accepted",             color: "#10B981", bg: "#ECFDF5", border: "#A7F3D0" },
  rejected:  { labelAr: "غير مختار",           labelEn: "Not Selected",         color: "#EF4444", bg: "#FEF2F2", border: "#FECACA" },
};

const TIMELINE_STEPS = ["pending", "reviewing", "interview", "accepted"] as const;

export default function TrackClient({ lang, messages: msg, initialId }: TrackClientProps) {
  const isAr = lang === "ar";
  const [inputId, setInputId] = useState(initialId || "");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [record, setRecord]     = useState<MockRecord | null>(null);

  useEffect(() => {
    if (initialId) handleSearch(initialId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSearch(id?: string) {
    const searchId = (id ?? inputId).trim().replace(/\s/g, "");
    if (!searchId) return;
    setLoading(true);
    setError("");
    setRecord(null);

    await new Promise((r) => setTimeout(r, 900)); // simulate loading

    const found = MOCK_RECORDS[searchId];
    if (found) {
      setRecord(found);
    } else {
      setError(
        isAr
          ? "لم يُعثر على بيانات بهذا الرقم القومي. يرجى التحقق والمحاولة مجدداً."
          : "No record found for this National ID. Please check and try again."
      );
    }
    setLoading(false);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleSearch();
  }

  const statusCfg = record ? STATUS_CONFIG[record.status] : null;
  const currentStepIdx = record
    ? TIMELINE_STEPS.indexOf(record.status as typeof TIMELINE_STEPS[number])
    : -1;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* ── Search Box ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8"
      >
        <form onSubmit={onSubmit} dir="rtl">
          <label className="block font-arabic font-semibold text-sm mb-3" style={{ color: "#0A192F" }}>
            {isAr ? "أدخل رقمك القومي" : "Enter your National ID"}
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <CreditCard
                size={16}
                className="absolute top-1/2 -translate-y-1/2 text-gray-400"
                style={{ right: "12px" }}
              />
              <input
                type="text"
                inputMode="numeric"
                maxLength={14}
                value={inputId}
                onChange={(e) => setInputId(e.target.value.replace(/\D/g, ""))}
                placeholder={isAr ? "أدخل الرقم القومي (14 رقم)" : "Enter National ID (14 digits)"}
                className="input-field text-sm font-mono"
                style={{ paddingRight: "2.5rem", direction: "ltr", textAlign: "left" }}
              />
            </div>
            <button
              type="submit"
              disabled={loading || inputId.length < 14}
              className="btn-primary text-sm px-6 py-3 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? <Loader2 size={16} className="animate-spin" />
                : <span className="font-arabic">{isAr ? "بحث" : "Search"}</span>
              }
            </button>
          </div>
          <p className="text-gray-400 text-xs mt-3 font-arabic text-right">
            {isAr
              ? "يُستخدم الرقم القومي المكون من 14 خانة للبحث عن بياناتك"
              : "Your 14-digit National ID is used to retrieve your application data"}
          </p>
        </form>
      </motion.div>

      {/* ── Error ──────────────────────────────────────────── */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 p-5 rounded-2xl border mb-8"
            style={{ background: "#FEF2F2", borderColor: "#FECACA" }}
            dir="rtl"
          >
            <AlertCircle size={20} style={{ color: "#EF4444", flexShrink: 0 }} />
            <p className="font-arabic text-sm" style={{ color: "#DC2626" }}>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Loading Skeleton ───────────────────────────────── */}
      {loading && (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-100 shimmer-bg"
              style={{ height: i === 0 ? "160px" : "80px" }}
            />
          ))}
        </div>
      )}

      {/* ── Result Card ────────────────────────────────────── */}
      <AnimatePresence>
        {record && !loading && statusCfg && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
            dir="rtl"
          >

            {/* Status Banner */}
            <div
              className="rounded-2xl border-2 p-5 flex items-center gap-4"
              style={{ background: statusCfg.bg, borderColor: statusCfg.border }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: statusCfg.bg, border: `2px solid ${statusCfg.border}` }}
              >
                <Clock size={22} style={{ color: statusCfg.color }} />
              </div>
              <div className="flex-1">
                <p className="font-arabic text-xs uppercase tracking-wider mb-0.5" style={{ color: "#6B7280" }}>
                  {isAr ? "حالة الطلب الحالية" : "Current Application Status"}
                </p>
                <p className="font-arabic font-bold text-xl" style={{ color: "#0A192F" }}>
                  {isAr ? statusCfg.labelAr : statusCfg.labelEn}
                </p>
              </div>
              <div
                className="px-4 py-1.5 rounded-full font-arabic font-bold text-xs"
                style={{ background: statusCfg.color, color: "white" }}
              >
                {isAr ? statusCfg.labelAr : statusCfg.labelEn}
              </div>
            </div>

            {/* Personal Info Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Card Header */}
              <div
                className="p-5 flex items-center gap-4"
                style={{ background: "linear-gradient(135deg, #0A192F 0%, #102B54 100%)" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(212,175,55,0.2)", border: "2px solid #D4AF37" }}
                >
                  <User size={26} style={{ color: "#D4AF37" }} />
                </div>
                <div>
                  <p className="font-arabic font-bold text-xl text-white leading-tight">
                    {record.full_name}
                  </p>
                  <p className="text-xs mt-1 font-mono" style={{ color: "#D4AF37" }} dir="ltr">
                    {record.national_id}
                  </p>
                </div>
              </div>

              {/* Info Grid */}
              <div className="divide-y divide-gray-50">
                {[
                  {
                    icon: CreditCard,
                    labelAr: "الرقم القومي",
                    labelEn: "National ID",
                    value: record.national_id,
                    mono: true,
                    dir: "ltr" as const,
                  },
                  {
                    icon: MapPin,
                    labelAr: "العنوان",
                    labelEn: "Address",
                    value: record.address,
                    mono: false,
                  },
                  {
                    icon: Calendar,
                    labelAr: "تاريخ الميلاد",
                    labelEn: "Date of Birth",
                    value: record.birthdate,
                    mono: false,
                    dir: "ltr" as const,
                  },
                  {
                    icon: Mail,
                    labelAr: "البريد الإلكتروني",
                    labelEn: "Email Address",
                    value: record.email || (isAr ? "— سيتم التحديث لاحقاً —" : "— To be updated —"),
                    mono: false,
                    muted: !record.email,
                  },
                ].map(({ icon: Icon, labelAr, labelEn, value, mono, dir, muted }) => (
                  <div key={labelAr} className="flex items-start gap-4 px-6 py-4">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "rgba(212,175,55,0.1)" }}
                    >
                      <Icon size={16} style={{ color: "#D4AF37" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-arabic text-xs font-medium mb-0.5" style={{ color: "#9CA3AF" }}>
                        {isAr ? labelAr : labelEn}
                      </p>
                      <p
                        className={`text-sm font-semibold ${mono ? "font-mono" : "font-arabic"} ${muted ? "italic" : ""}`}
                        style={{ color: muted ? "#9CA3AF" : "#0A192F", direction: dir || "inherit" }}
                      >
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Registration Info */}
            <div
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <h3 className="font-arabic font-bold text-base mb-4 flex items-center gap-2" style={{ color: "#0A192F" }}>
                <UserCheck size={18} style={{ color: "#D4AF37" }} />
                {isAr ? "معلومات التسجيل" : "Registration Info"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="rounded-xl p-4"
                  style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)" }}
                >
                  <p className="font-arabic text-xs mb-1" style={{ color: "#9CA3AF" }}>
                    {isAr ? "تم التسجيل بواسطة" : "Registered By"}
                  </p>
                  <p className="font-arabic font-bold text-sm" style={{ color: "#0A192F" }}>
                    {record.registered_by}
                  </p>
                </div>
                <div
                  className="rounded-xl p-4"
                  style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)" }}
                >
                  <p className="font-arabic text-xs mb-1" style={{ color: "#9CA3AF" }}>
                    {isAr ? "تاريخ التسجيل" : "Registration Date"}
                  </p>
                  <p className="font-bold text-sm font-mono" style={{ color: "#0A192F" }}>
                    {record.registered_at}
                  </p>
                </div>
              </div>
            </div>

            {/* Interview Info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-arabic font-bold text-base mb-4 flex items-center gap-2" style={{ color: "#0A192F" }}>
                <Building2 size={18} style={{ color: "#D4AF37" }} />
                {isAr ? "تفاصيل المقابلة" : "Interview Details"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="rounded-xl p-4"
                  style={{ background: "#F9FAFB", border: "1px dashed #E5E7EB" }}
                >
                  <p className="font-arabic text-xs mb-1" style={{ color: "#9CA3AF" }}>
                    {isAr ? "مكان الإنترفيو" : "Interview Location"}
                  </p>
                  <p className="font-arabic font-semibold text-sm" style={{ color: record.interview_location ? "#0A192F" : "#6B7280" }}>
                    {record.interview_location || (isAr ? "قيد المراجعة" : "Under Review")}
                  </p>
                </div>
                <div
                  className="rounded-xl p-4"
                  style={{ background: "#F9FAFB", border: "1px dashed #E5E7EB" }}
                >
                  <p className="font-arabic text-xs mb-1" style={{ color: "#9CA3AF" }}>
                    {isAr ? "موعد المقابلة" : "Interview Date"}
                  </p>
                  <p className="font-arabic font-semibold text-sm" style={{ color: record.interview_date ? "#0A192F" : "#6B7280" }}>
                    {record.interview_date || (isAr ? "قيد المراجعة" : "Under Review")}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Timeline */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-arabic font-bold text-base mb-6 flex items-center gap-2" style={{ color: "#0A192F" }}>
                <CheckCircle2 size={18} style={{ color: "#D4AF37" }} />
                {isAr ? "مسار الطلب" : "Application Timeline"}
              </h3>
              <div className="flex items-center justify-between gap-2">
                {TIMELINE_STEPS.map((step, i) => {
                  const cfg = STATUS_CONFIG[step];
                  const isDone = i <= currentStepIdx;
                  const isCurrent = i === currentStepIdx;
                  return (
                    <div key={step} className="flex-1 flex flex-col items-center gap-2 relative">
                      {/* connector line */}
                      {i < TIMELINE_STEPS.length - 1 && (
                        <div
                          className="absolute top-4 right-1/2 w-full h-0.5 z-0"
                          style={{ background: i < currentStepIdx ? "#D4AF37" : "#E5E7EB" }}
                        />
                      )}
                      {/* circle */}
                      <div
                        className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all"
                        style={{
                          background: isDone ? cfg.color : "white",
                          borderColor: isDone ? cfg.color : "#E5E7EB",
                          boxShadow: isCurrent ? `0 0 0 4px ${cfg.color}25` : "none",
                        }}
                      >
                        {isDone
                          ? <CheckCircle2 size={14} color="white" />
                          : <div className="w-2 h-2 rounded-full bg-gray-300" />
                        }
                      </div>
                      <p
                        className="font-arabic text-center text-[10px] font-semibold leading-tight"
                        style={{ color: isDone ? cfg.color : "#9CA3AF" }}
                      >
                        {isAr ? cfg.labelAr : cfg.labelEn}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Email Notice */}
            <div
              className="rounded-2xl p-5 flex items-center gap-4"
              style={{ background: "linear-gradient(135deg, #0A192F 0%, #102B54 100%)" }}
            >
              <Send size={20} style={{ color: "#D4AF37", flexShrink: 0 }} />
              <p className="font-arabic text-sm text-white/80 leading-relaxed">
                {isAr
                  ? "سيتم إرسال جميع التحديثات في البريد الإلكتروني الخاص بكم فور توافرها."
                  : "All updates will be sent to your registered email address as soon as they are available."}
              </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
