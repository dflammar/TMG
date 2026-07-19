"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, MapPin, Maximize2 } from "lucide-react";

type Lang = "en" | "ar";

type ProjectsProps = {
  lang: Lang;
  messages: Record<string, string>;
};

export default function ProjectsSection({ lang, messages: msg }: ProjectsProps) {
  const isAr = lang === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const projects = [
    {
      key: "madinaty",
      title: msg.madinaty_title,
      desc: msg.madinaty_desc,
      image: "/images/madinaty.jpg",
      location: isAr ? "القاهرة الجديدة، مصر" : "New Cairo, Egypt",
      area: isAr ? "8,000+ فدان" : "8,000+ Acres",
      tag: isAr ? "مجتمع سكني" : "Integrated City",
    },
    {
      key: "southmed",
      title: msg.southmed_title,
      desc: msg.southmed_desc,
      image: "/images/southmed.jpg",
      location: isAr ? "الساحل الشمالي، مصر" : "North Coast, Egypt",
      area: isAr ? "واجهة بحرية 9 كم" : "9km Seafront",
      tag: isAr ? "منتجع ساحلي" : "Coastal Resort",
    },
  ];

  return (
    <section
      id="projects"
      className="py-28 bg-navy-900 relative overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
      ref={ref}
    >
      {/* Decorative blobs */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-5">
            {msg.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            {msg.title}
          </h2>
          <div className="w-16 h-1 bg-gold-gradient rounded-full mx-auto mt-6" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.key}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] cursor-pointer"
            >
              {/* Image */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-900/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

              {/* Tag */}
              <div className="absolute top-5 left-5 right-5 flex justify-between items-start">
                <span className="px-3 py-1 rounded-full bg-gold-500/90 text-navy-900 text-xs font-semibold">
                  {project.tag}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={14} className="text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <h3 className={`text-white font-display font-bold text-3xl mb-2 ${isAr ? "font-arabic" : ""}`}>
                  {project.title}
                </h3>
                <p className={`text-white/60 text-sm leading-relaxed mb-4 line-clamp-2 ${isAr ? "font-arabic" : ""}`}>
                  {project.desc}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-white/40 text-xs mb-5">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-gold-400" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Maximize2 size={12} className="text-gold-400" />
                    {project.area}
                  </span>
                </div>

                <Link
                  href={`/${lang}/careers`}
                  className="inline-flex items-center gap-2 text-gold-400 text-sm font-semibold hover:text-gold-300 transition-colors"
                >
                  {msg.view_project}
                  <ArrowIcon size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
