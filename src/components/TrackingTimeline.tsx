"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, Search, CalendarCheck, XCircle, Loader2 } from "lucide-react";
import type { Application, StatusHistory, ApplicationStatus } from "@/lib/actions";

type Lang = "en" | "ar";

type TrackingProps = {
  application: Application;
  history: StatusHistory[];
  lang: Lang;
  messages: Record<string, string>;
};

const STATUS_CONFIG: Record<
  ApplicationStatus,
  { icon: React.ElementType; color: string; bgColor: string; borderColor: string }
> = {
  pending:   { icon: Clock,          color: "text-amber-500",  bgColor: "bg-amber-50",  borderColor: "border-amber-200" },
  reviewing: { icon: Search,         color: "text-blue-500",   bgColor: "bg-blue-50",   borderColor: "border-blue-200" },
  interview: { icon: CalendarCheck,  color: "text-purple-500", bgColor: "bg-purple-50", borderColor: "border-purple-200" },
  accepted:  { icon: CheckCircle2,   color: "text-green-500",  bgColor: "bg-green-50",  borderColor: "border-green-200" },
  rejected:  { icon: XCircle,        color: "text-red-400",    bgColor: "bg-red-50",    borderColor: "border-red-200" },
};

const STATUS_ORDER: ApplicationStatus[] = ["pending", "reviewing", "interview", "accepted"];

function getStatusLabel(status: ApplicationStatus, lang: Lang, msg: Record<string, string>) {
  const map: Record<ApplicationStatus, string> = {
    pending:   msg.status_pending,
    reviewing: msg.status_reviewing,
    interview: msg.status_interview,
    accepted:  msg.status_accepted,
    rejected:  msg.status_rejected,
  };
  return map[status];
}

export default function TrackingTimeline({ application, history, lang, messages: msg }: TrackingProps) {
  const isAr = lang === "ar";
  const currentStatus = application.status;
  const isRejected = currentStatus === "rejected";

  const timelineSteps = isRejected
    ? [...STATUS_ORDER.slice(0, STATUS_ORDER.indexOf(
        history.find(h => h.status !== "pending")?.status as ApplicationStatus || "reviewing"
      ) + 1), "rejected" as ApplicationStatus]
    : STATUS_ORDER;

  const currentIdx = timelineSteps.indexOf(currentStatus);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      dir={isAr ? "rtl" : "ltr"}
      className="space-y-8"
    >
      {/* Application Meta Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <p className={`text-navy-700/50 text-xs uppercase tracking-wider mb-1 ${isAr ? "font-arabic" : ""}`}>
              {msg.applicant}
            </p>
            <p className={`text-navy-900 font-semibold ${isAr ? "font-arabic" : ""}`}>
              {application.full_name}
            </p>
          </div>
          <div>
            <p className={`text-navy-700/50 text-xs uppercase tracking-wider mb-1 ${isAr ? "font-arabic" : ""}`}>
              {msg.position}
            </p>
            <p className={`text-navy-900 font-semibold ${isAr ? "font-arabic" : ""}`}>
              {application.job_title}
            </p>
          </div>
          <div>
            <p className={`text-navy-700/50 text-xs uppercase tracking-wider mb-1 ${isAr ? "font-arabic" : ""}`}>
              {msg.submitted}
            </p>
            <p className="text-navy-900 font-semibold" dir="ltr">
              {new Date(application.created_at).toLocaleDateString(
                isAr ? "ar-EG" : "en-GB",
                { year: "numeric", month: "long", day: "numeric" }
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Current Status Banner */}
      {(() => {
        const cfg = STATUS_CONFIG[currentStatus];
        const Icon = cfg.icon;
        return (
          <div className={`rounded-2xl border-2 ${cfg.borderColor} ${cfg.bgColor} p-5 flex items-center gap-4`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cfg.bgColor} border ${cfg.borderColor}`}>
              <Icon size={24} className={cfg.color} />
            </div>
            <div>
              <p className={`text-navy-700/60 text-xs uppercase tracking-wider ${isAr ? "font-arabic" : ""}`}>
                {isAr ? "الحالة الحالية" : "Current Status"}
              </p>
              <p className={`font-display font-bold text-navy-900 text-lg ${isAr ? "font-arabic" : ""}`}>
                {getStatusLabel(currentStatus, lang, msg)}
              </p>
            </div>
          </div>
        );
      })()}

      {/* Timeline */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className={`text-navy-900 font-semibold mb-6 ${isAr ? "font-arabic" : ""}`}>
          {msg.timeline_title}
        </h3>

        <div className="relative">
          {/* Vertical line */}
          <div className={`absolute top-0 bottom-0 w-0.5 bg-gray-100 ${isAr ? "right-5" : "left-5"}`} />

          <div className="space-y-6">
            {timelineSteps.map((step, i) => {
              const isDone = i <= currentIdx;
              const isCurrent = i === currentIdx;
              const cfg = STATUS_CONFIG[step];
              const Icon = cfg.icon;
              const histEntry = history.find(h => h.status === step);

              return (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`relative flex items-start gap-5 ${isAr ? "flex-row-reverse" : ""}`}
                >
                  {/* Circle */}
                  <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 shrink-0 transition-all duration-500 ${
                    isDone
                      ? `${cfg.bgColor} ${cfg.borderColor}`
                      : "bg-gray-50 border-gray-200"
                  } ${isCurrent ? "ring-4 ring-offset-2 ring-gold-500/30" : ""}`}
                  >
                    {isDone ? (
                      <Icon size={18} className={cfg.color} />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-gray-300" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 pt-1.5 ${isAr ? "text-right" : ""}`}>
                    <p className={`font-semibold text-sm ${isDone ? "text-navy-900" : "text-gray-400"} ${isAr ? "font-arabic" : ""}`}>
                      {getStatusLabel(step, lang, msg)}
                      {isCurrent && (
                        <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-700 text-[10px] font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                          {isAr ? "الآن" : "Now"}
                        </span>
                      )}
                    </p>
                    {histEntry && (
                      <p className={`text-gray-400 text-xs mt-1 ${isAr ? "font-arabic" : ""}`}>
                        {isAr ? histEntry.note_ar : histEntry.note_en}
                      </p>
                    )}
                    {histEntry && (
                      <p className="text-gray-300 text-[11px] mt-0.5" dir="ltr">
                        {new Date(histEntry.changed_at).toLocaleString(
                          isAr ? "ar-EG" : "en-GB"
                        )}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
