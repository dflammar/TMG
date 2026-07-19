"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Briefcase, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import type { Job } from "@/lib/jobs-data";

type Lang = "en" | "ar";

type JobCardProps = {
  job: Job;
  lang: Lang;
  messages: Record<string, string>;
  index?: number;
};

export default function JobCard({ job, lang, messages: msg, index = 0 }: JobCardProps) {
  const isAr = lang === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const title = isAr ? job.title_ar : job.title_en;
  const department = isAr ? job.department_ar : job.department_en;
  const location = isAr ? job.location_ar : job.location_en;
  const experience = isAr ? job.experience_ar : job.experience_en;
  const type = isAr ? job.type_ar : job.type_en;

  const daysAgo = Math.floor(
    (Date.now() - new Date(job.posted).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group bg-white rounded-2xl border border-gray-100 hover:border-gold-300 hover:shadow-xl transition-all duration-300 p-6 flex flex-col"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        {/* Department Badge */}
        <span className="px-3 py-1 rounded-full bg-navy-900/6 text-navy-800 text-xs font-semibold">
          {department}
        </span>
        {/* Type badge */}
        <span className="px-3 py-1 rounded-full bg-gold-500/10 text-gold-700 text-xs font-semibold">
          {type}
        </span>
      </div>

      {/* Title */}
      <h3 className={`font-display font-bold text-navy-900 text-xl mb-3 group-hover:text-gold-600 transition-colors leading-tight ${isAr ? "font-arabic" : ""}`}>
        {title}
      </h3>

      {/* Meta */}
      <div className="flex flex-col gap-2 mb-5">
        <div className="flex items-center gap-2 text-navy-700/60 text-sm">
          <MapPin size={13} className="text-gold-500 shrink-0" />
          <span className={isAr ? "font-arabic" : ""}>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-navy-700/60 text-sm">
          <Briefcase size={13} className="text-gold-500 shrink-0" />
          <span className={isAr ? "font-arabic" : ""}>{experience}</span>
        </div>
        <div className="flex items-center gap-2 text-navy-700/40 text-xs">
          <Clock size={12} className="shrink-0" />
          <span>{isAr ? `منذ ${daysAgo} يوم` : `${daysAgo} days ago`}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 mb-5" />

      {/* Apply Button */}
      <div className="mt-auto">
        <Link
          href={`/${lang}/careers/${job.id}`}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-navy-900 text-white text-sm font-semibold hover:bg-gold-500 hover:text-navy-900 transition-all duration-300 group-hover:shadow-md"
        >
          {msg.apply_now}
          <ArrowIcon size={15} />
        </Link>
      </div>
    </motion.div>
  );
}
