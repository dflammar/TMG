"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Briefcase } from "lucide-react";
import JobCard from "@/components/JobCard";
import { jobs, departments_en, departments_ar } from "@/lib/jobs-data";
import type { Job } from "@/lib/jobs-data";

type Lang = "en" | "ar";

type CareersClientProps = {
  lang: Lang;
  messages: Record<string, string>;
};

export default function CareersClient({ lang, messages: msg }: CareersClientProps) {
  const isAr = lang === "ar";
  const [query, setQuery] = useState("");
  const [activeDept, setActiveDept] = useState(0);

  const departments = isAr ? departments_ar : departments_en;

  const filtered = useMemo(() => {
    return jobs.filter((job: Job) => {
      const title = isAr ? job.title_ar : job.title_en;
      const dept = isAr ? job.department_ar : job.department_en;

      const matchesQuery =
        !query ||
        title.toLowerCase().includes(query.toLowerCase()) ||
        dept.toLowerCase().includes(query.toLowerCase());

      const matchesDept =
        activeDept === 0 ||
        dept === departments[activeDept];

      return matchesQuery && matchesDept;
    });
  }, [query, activeDept, isAr, departments]);

  return (
    <div dir={isAr ? "rtl" : "ltr"}>
      {/* Search & Filter */}
      <div className="bg-white border-b border-gray-100 sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={16}
                className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isAr ? "right-3" : "left-3"}`}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={msg.search_placeholder}
                className={`input-field text-sm ${isAr ? "pr-9 font-arabic" : "pl-9"}`}
              />
            </div>

            {/* Department Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 flex-wrap">
              <Filter size={14} className="text-gray-400 shrink-0" />
              {departments.map((dept, i) => (
                <button
                  key={dept}
                  onClick={() => setActiveDept(i)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    activeDept === i
                      ? "bg-navy-900 text-white shadow-md"
                      : "bg-gray-100 text-navy-700 hover:bg-gold-500/10 hover:text-gold-700"
                  } ${isAr ? "font-arabic" : ""}`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className={`text-navy-700/60 text-sm ${isAr ? "font-arabic" : ""}`}>
          <span className="font-semibold text-navy-900">{filtered.length}</span>{" "}
          {msg.openings}
        </p>
      </div>

      {/* Jobs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((job, i) => (
              <JobCard
                key={job.id}
                job={job}
                lang={lang}
                messages={msg}
                index={i}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
              <Briefcase size={28} className="text-gray-300" />
            </div>
            <p className={`text-navy-700/50 text-lg ${isAr ? "font-arabic" : ""}`}>
              {msg.no_jobs}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
