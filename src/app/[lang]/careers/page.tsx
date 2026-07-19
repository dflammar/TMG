import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CareersClient from "@/components/CareersClient";
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
    title:
      lang === "ar"
        ? "الوظائف المتاحة | مجموعة طلعت مصطفى"
        : "Careers | Talaat Moustafa Group",
    description:
      lang === "ar"
        ? "استكشف الوظائف المتاحة في مجموعة طلعت مصطفى وقدّم طلبك الآن"
        : "Explore open positions at Talaat Moustafa Group and apply today",
  };
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "ar") notFound();

  const typedLang = lang as Lang;
  const isAr = typedLang === "ar";
  const msg = messages[typedLang];

  return (
    <div>
      {/* Hero Banner */}
      <div
        className="relative bg-navy-900 pt-36 pb-20 overflow-hidden"
        dir={isAr ? "rtl" : "ltr"}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #D4AF37 0%, transparent 50%), radial-gradient(circle at 80% 20%, #D4AF37 0%, transparent 40%)",
          }}
        />
        <div className="absolute top-0 inset-x-0 h-px bg-gold-gradient opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            {msg.careers.badge}
          </span>
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-5 leading-tight ${
              isAr ? "font-arabic" : ""
            }`}
          >
            {msg.careers.title}
          </h1>
          <p
            className={`text-white/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${
              isAr ? "font-arabic" : ""
            }`}
          >
            {msg.careers.subtitle}
          </p>
          <div className="w-16 h-1 bg-gold-gradient rounded-full mx-auto mt-8" />
        </div>
      </div>

      {/* Client-side search & jobs grid */}
      <CareersClient lang={typedLang} messages={msg.careers as Record<string, string>} />
    </div>
  );
}
