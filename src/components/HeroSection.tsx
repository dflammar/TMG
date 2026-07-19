"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, ChevronDown, Play } from "lucide-react";

type Lang = "en" | "ar";

type HeroProps = {
  lang: Lang;
  messages: Record<string, string>;
};

export default function HeroSection({ lang, messages: msg }: HeroProps) {
  const isAr = lang === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const stats = [
    { value: msg.stat1, label: msg.stat1_label },
    { value: msg.stat2, label: msg.stat2_label },
    { value: msg.stat3, label: msg.stat3_label },
  ];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="TMG Madinaty Aerial View"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/92 via-navy-900/75 to-navy-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: "linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            {msg.badge}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`font-display font-bold leading-[1.05] text-white mb-6 ${isAr ? "text-5xl md:text-6xl lg:text-7xl" : "text-5xl md:text-6xl lg:text-7xl"}`}
          >
            {msg.headline1}{" "}
            <span className="gold-text">{msg.headline2}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-white/60 text-lg md:text-xl leading-relaxed mb-10 max-w-xl ${isAr ? "font-arabic" : ""}`}
          >
            {msg.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link href={`/${lang}/careers`} className="btn-primary text-sm px-8 py-4">
              {msg.cta_careers}
              <ArrowIcon size={16} />
            </Link>
            <Link href={`/${lang}#projects`} className="btn-outline text-sm px-8 py-4">
              <Play size={14} fill="currentColor" />
              {msg.cta_projects}
            </Link>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 flex flex-wrap gap-px rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm max-w-2xl"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex-1 min-w-[120px] px-6 py-5 text-center border-r border-white/10 last:border-r-0"
            >
              <div className={`text-gold-400 font-display font-bold text-2xl md:text-3xl ${isAr ? "font-arabic" : ""}`}>
                {stat.value}
              </div>
              <div className={`text-white/50 text-xs mt-1 font-medium uppercase tracking-wider ${isAr ? "font-arabic" : ""}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
