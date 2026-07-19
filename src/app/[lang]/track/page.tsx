import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TrackClient from "@/components/TrackClient";
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
        ? "تتبع طلبك | مجموعة طلعت مصطفى"
        : "Track Application | Talaat Moustafa Group",
    description:
      lang === "ar"
        ? "تابع حالة طلب التوظيف الخاص بك باستخدام رقم الطلب"
        : "Track the status of your job application using your Application ID",
  };
}

export default async function TrackPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ id?: string }>;
}) {
  const { lang } = await params;
  const { id } = await searchParams;

  if (lang !== "en" && lang !== "ar") notFound();

  const typedLang = lang as Lang;
  const isAr = typedLang === "ar";
  const msg = messages[typedLang];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div
        className="relative bg-navy-900 pt-36 pb-20 overflow-hidden"
        dir={isAr ? "rtl" : "ltr"}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 30%, #D4AF37 0%, transparent 60%)",
          }}
        />
        <div className="absolute top-0 inset-x-0 h-px bg-gold-gradient opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            {msg.track.badge}
          </span>
          <h1
            className={`text-4xl md:text-5xl font-display font-bold text-white mb-5 ${
              isAr ? "font-arabic" : ""
            }`}
          >
            {msg.track.title}
          </h1>
          <p
            className={`text-white/50 text-lg max-w-xl mx-auto ${
              isAr ? "font-arabic" : ""
            }`}
          >
            {msg.track.subtitle}
          </p>
          <div className="w-16 h-1 bg-gold-gradient rounded-full mx-auto mt-8" />
        </div>
      </div>

      {/* Track Client */}
      <TrackClient
        lang={typedLang}
        messages={msg.track as Record<string, string>}
        initialId={id}
      />
    </div>
  );
}
