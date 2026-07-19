"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ChevronDown } from "lucide-react";

type Lang = "en" | "ar";

type NavProps = {
  lang: Lang;
  messages: Record<string, string>;
};

const navLinks = (lang: Lang, msg: Record<string, string>) => [
  { href: `/${lang}`, label: msg.home },
  { href: `/${lang}#about`, label: msg.about },
  { href: `/${lang}#projects`, label: msg.projects },
  { href: `/${lang}/careers`, label: msg.careers },
  { href: `/${lang}/track`, label: msg.track },
];

export default function Navbar({ lang, messages }: NavProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const otherLang = lang === "en" ? "ar" : "en";
  const otherPath = pathname.replace(`/${lang}`, `/${otherLang}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-900/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gold-gradient flex items-center justify-center shadow-md group-hover:shadow-gold-500/40 transition-shadow duration-300">
              <span className="text-navy-900 font-display font-bold text-base">T</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-display font-bold text-lg leading-tight tracking-wide">
                TMG
              </span>
              <span className="text-gold-400 text-[10px] tracking-widest uppercase font-medium leading-tight">
                Talaat Moustafa Group
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks(lang, messages).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-white/80 hover:text-gold-400 font-medium text-sm transition-colors ${
                  lang === "ar" ? "font-arabic" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Lang + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Toggle */}
            <Link
              href={otherPath}
              className="flex items-center gap-1.5 text-white/70 hover:text-gold-400 text-sm font-medium transition-colors"
            >
              <Globe size={15} />
              <span>{otherLang === "ar" ? "العربية" : "English"}</span>
            </Link>

            {/* CTA Button */}
            <Link href={`/${lang}/careers`} className="btn-primary text-xs px-5 py-2.5">
              {lang === "ar" ? "قدّم الآن" : "Apply Now"}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-white/80 hover:text-gold-400 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-navy-900/98 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks(lang, messages).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-white/80 hover:text-gold-400 font-medium text-base transition-colors ${
                    lang === "ar" ? "font-arabic text-right" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <Link
                  href={otherPath}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-1.5 text-white/60 hover:text-gold-400 text-sm transition-colors"
                >
                  <Globe size={14} />
                  {otherLang === "ar" ? "العربية" : "English"}
                </Link>
                <Link
                  href={`/${lang}/careers`}
                  onClick={() => setOpen(false)}
                  className="btn-primary text-xs px-5 py-2.5"
                >
                  {lang === "ar" ? "قدّم الآن" : "Apply Now"}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
