import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Briefcase } from "lucide-react";
import enMessages from "@/messages/en.json";
import arMessages from "@/messages/ar.json";

type Lang = "en" | "ar";
const messages = { en: enMessages, ar: arMessages };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "ar" ? "الرئيسية | مجموعة طلعت مصطفى" : "Home | Talaat Moustafa Group",
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "ar") notFound();

  const typedLang = lang as Lang;
  const isAr = typedLang === "ar";
  const msg = messages[typedLang];
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <>
      {/* Hero */}
      <HeroSection lang={typedLang} messages={msg.hero as Record<string, string>} />

      {/* About */}
      <AboutSection lang={typedLang} messages={msg.about as Record<string, string>} />

      {/* Projects */}
      <ProjectsSection lang={typedLang} messages={msg.projects as Record<string, string>} />

      {/* Careers CTA Banner */}
      <section
        className="py-24 bg-cream relative overflow-hidden"
        dir={isAr ? "rtl" : "ltr"}
      >
        <div className="absolute inset-0 shimmer-bg" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <div className="w-16 h-16 rounded-2xl bg-navy-900 flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Briefcase size={28} className="text-gold-400" />
          </div>
          <h2 className={`section-title mb-4 ${isAr ? "font-arabic" : ""}`}>
            {isAr ? "انضم إلى فريق طلعت مصطفى" : "Join the TMG Family"}
          </h2>
          <p className={`text-navy-700/60 text-lg mb-8 max-w-xl mx-auto ${isAr ? "font-arabic" : ""}`}>
            {isAr
              ? "نبحث عن مواهب استثنائية تشاركنا شغفنا في بناء مصر الحديثة"
              : "We're looking for exceptional talent to help us build modern Egypt. Explore our open positions today."}
          </p>
          <Link href={`/${typedLang}/careers`} className="btn-primary text-sm px-8 py-4">
            {isAr ? "استعرض الوظائف المتاحة" : "View Open Positions"}
            <ArrowIcon size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
