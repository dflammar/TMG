import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import enMessages from "@/messages/en.json";
import arMessages from "@/messages/ar.json";

type Lang = "en" | "ar";

const messages = { en: enMessages, ar: arMessages };

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "ar" ? "مجموعة طلعت مصطفى" : "Talaat Moustafa Group",
    description:
      lang === "ar"
        ? "الشركة الرائدة في التطوير العقاري بمصر"
        : "Egypt's leading real estate developer",
    alternates: {
      languages: { en: "/en", ar: "/ar" },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (lang !== "en" && lang !== "ar") {
    notFound();
  }

  const typedLang = lang as Lang;
  const msg = messages[typedLang];

  return (
    <div lang={typedLang} dir={typedLang === "ar" ? "rtl" : "ltr"}>
      <Navbar lang={typedLang} messages={msg.nav as Record<string, string>} />
      <main>{children}</main>
      <Footer lang={typedLang} messages={msg.footer as Record<string, string>} />
    </div>
  );
}
