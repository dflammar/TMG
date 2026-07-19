"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Award, Lightbulb, Shield, Users } from "lucide-react";

type Lang = "en" | "ar";

type AboutProps = {
  lang: Lang;
  messages: Record<string, string>;
};

export default function AboutSection({ lang, messages: msg }: AboutProps) {
  const isAr = lang === "ar";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    { icon: Award, title: msg.v1, desc: msg.v1_desc },
    { icon: Lightbulb, title: msg.v2, desc: msg.v2_desc },
    { icon: Shield, title: msg.v3, desc: msg.v3_desc },
    { icon: Users, title: msg.v4, desc: msg.v4_desc },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="about"
      className="py-28 bg-cream relative overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-900/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 50 : -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="/images/team.jpg"
                alt="TMG Corporate Team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy-900/30 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-navy-900 rounded-2xl p-5 shadow-xl border border-white/10">
              <div className="text-gold-400 font-display font-bold text-3xl">40+</div>
              <div className={`text-white/60 text-xs mt-1 ${isAr ? "font-arabic" : ""}`}>
                {isAr ? "عاماً من التميز" : "Years of Excellence"}
              </div>
            </div>

            {/* Gold accent */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-gold-500/40 rounded-2xl" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <span className="section-badge">{msg.badge}</span>
            </motion.div>

            <motion.h2 variants={itemVariants} className="section-title mb-6">
              {msg.title}
            </motion.h2>

            <motion.div variants={itemVariants} className="gold-line mb-8" />

            <motion.p
              variants={itemVariants}
              className={`text-navy-700/70 text-lg leading-relaxed mb-10 ${isAr ? "font-arabic" : ""}`}
            >
              {msg.description}
            </motion.p>

            {/* Values Grid */}
            <motion.div variants={containerVariants} className="grid grid-cols-2 gap-4">
              {values.map(({ icon: Icon, title, desc }) => (
                <motion.div
                  key={title}
                  variants={itemVariants}
                  className="group p-5 rounded-2xl bg-white border border-gray-100 hover:border-gold-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center mb-3 group-hover:bg-gold-500/20 transition-colors">
                    <Icon size={18} className="text-gold-600" />
                  </div>
                  <div className={`font-semibold text-navy-900 text-sm mb-1 ${isAr ? "font-arabic" : ""}`}>
                    {title}
                  </div>
                  <div className={`text-navy-700/60 text-xs leading-relaxed ${isAr ? "font-arabic" : ""}`}>
                    {desc}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
