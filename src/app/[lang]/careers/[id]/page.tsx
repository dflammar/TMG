import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, MapPin, Briefcase, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import ApplicationForm from "@/components/ApplicationForm";
import { jobs } from "@/lib/jobs-data";
import enMessages from "@/messages/en.json";
import arMessages from "@/messages/ar.json";

type Lang = "en" | "ar";
const messages = { en: enMessages, ar: arMessages };

export async function generateStaticParams() {
  return jobs.map((job) => [
    { lang: "en", id: job.id },
    { lang: "ar", id: job.id },
  ]).flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  const job = jobs.find((j) => j.id === id);
  if (!job) return { title: "Not Found" };
  const title = lang === "ar" ? job.title_ar : job.title_en;
  return {
    title: `${title} | TMG Careers`,
    description: lang === "ar" ? job.description_ar : job.description_en,
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  if (lang !== "en" && lang !== "ar") notFound();

  const job = jobs.find((j) => j.id === id);
  if (!job) notFound();

  const typedLang = lang as Lang;
  const isAr = typedLang === "ar";
  const msg = messages[typedLang];
  const BackArrow = isAr ? ArrowRight : ArrowLeft;

  const title = isAr ? job.title_ar : job.title_en;
  const department = isAr ? job.department_ar : job.department_en;
  const location = isAr ? job.location_ar : job.location_en;
  const experience = isAr ? job.experience_ar : job.experience_en;
  const type = isAr ? job.type_ar : job.type_en;
  const description = isAr ? job.description_ar : job.description_en;
  const requirements = isAr ? job.requirements_ar : job.requirements_en;

  return (
    <div className="min-h-screen bg-gray-50" dir={isAr ? "rtl" : "ltr"}>
      {/* Top Nav Bar */}
      <div className="bg-navy-900 pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #D4AF37 0%, transparent 60%)" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Back link */}
          <Link
            href={`/${typedLang}/careers`}
            className={`inline-flex items-center gap-2 text-white/50 hover:text-gold-400 text-sm mb-8 transition-colors ${isAr ? "flex-row-reverse" : ""}`}
          >
            <BackArrow size={15} />
            <span className={isAr ? "font-arabic" : ""}>
              {isAr ? "العودة للوظائف" : "Back to Careers"}
            </span>
          </Link>

          {/* Job Header */}
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-semibold">
                  {department}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs font-semibold">
                  {type}
                </span>
              </div>
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight ${
                  isAr ? "font-arabic" : ""
                }`}
              >
                {title}
              </h1>
              <div className="flex flex-wrap items-center gap-5 mt-5 text-white/50 text-sm">
                <span className="flex items-center gap-2">
                  <MapPin size={13} className="text-gold-400" />
                  <span className={isAr ? "font-arabic" : ""}>{location}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Briefcase size={13} className="text-gold-400" />
                  <span className={isAr ? "font-arabic" : ""}>{experience}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={13} className="text-gold-400" />
                  <span dir="ltr">
                    {new Date(job.posted).toLocaleDateString(isAr ? "ar-EG" : "en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Details */}
          <div className="lg:col-span-3 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <h2
                className={`font-display font-bold text-navy-900 text-xl mb-4 ${
                  isAr ? "font-arabic" : ""
                }`}
              >
                {isAr ? "عن الوظيفة" : "About the Role"}
              </h2>
              <div className="w-10 h-0.5 bg-gold-gradient rounded mb-5" />
              <p
                className={`text-navy-700/70 leading-relaxed text-base ${
                  isAr ? "font-arabic" : ""
                }`}
              >
                {description}
              </p>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <h2
                className={`font-display font-bold text-navy-900 text-xl mb-4 ${
                  isAr ? "font-arabic" : ""
                }`}
              >
                {isAr ? "المتطلبات" : "Requirements"}
              </h2>
              <div className="w-10 h-0.5 bg-gold-gradient rounded mb-5" />
              <ul className="space-y-3">
                {requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      size={16}
                      className="text-gold-500 mt-0.5 shrink-0"
                    />
                    <span
                      className={`text-navy-700/70 text-sm leading-relaxed ${
                        isAr ? "font-arabic" : ""
                      }`}
                    >
                      {req}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What We Offer */}
            <div className="bg-navy-900 rounded-2xl p-8">
              <h2
                className={`font-display font-bold text-white text-xl mb-4 ${
                  isAr ? "font-arabic" : ""
                }`}
              >
                {isAr ? "ماذا نقدم لك" : "What We Offer"}
              </h2>
              <div className="w-10 h-0.5 bg-gold-gradient rounded mb-5" />
              <ul className="space-y-3">
                {(isAr
                  ? [
                      "راتب تنافسي وحزمة مزايا شاملة",
                      "بيئة عمل احترافية وملهمة",
                      "فرص تطوير وترقي واضحة",
                      "تأمين صحي للموظف وعائلته",
                      "نادي رياضي وأنشطة اجتماعية",
                    ]
                  : [
                      "Competitive salary & comprehensive benefits package",
                      "Professional and inspiring work environment",
                      "Clear career development & promotion paths",
                      "Health insurance for employee and family",
                      "Sports club membership & social activities",
                    ]
                ).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      size={16}
                      className="text-gold-400 mt-0.5 shrink-0"
                    />
                    <span
                      className={`text-white/70 text-sm ${
                        isAr ? "font-arabic" : ""
                      }`}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Application Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sticky top-28">
              <h2
                className={`font-display font-bold text-navy-900 text-xl mb-1 ${
                  isAr ? "font-arabic" : ""
                }`}
              >
                {isAr ? "قدّم على هذه الوظيفة" : "Apply for this Role"}
              </h2>
              <div className="w-10 h-0.5 bg-gold-gradient rounded mb-6 mt-3" />
              <ApplicationForm
                job={job}
                lang={typedLang}
                messages={msg.apply as Record<string, string>}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
