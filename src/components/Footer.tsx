import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

// Inline SVG social icons (lucide-react dropped branded icons)
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

type Lang = "en" | "ar";

type FooterProps = {
  lang: Lang;
  messages: Record<string, string>;
};

const navLinks = (lang: Lang, msg: Record<string, string>) => [
  { href: `/${lang}`, label: msg.home },
  { href: `/${lang}/careers`, label: msg.careers },
  { href: `/${lang}/track`, label: msg.track },
];

export default function Footer({ lang, messages: msg }: FooterProps) {
  const isAr = lang === "ar";

  return (
    <footer className="bg-navy-950 text-white/80" dir={isAr ? "rtl" : "ltr"}>
      {/* Gold top border */}
      <div className="h-1 bg-gold-gradient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-gold-gradient flex items-center justify-center">
                <span className="text-navy-900 font-display font-bold text-base">T</span>
              </div>
              <div>
                <div className="text-white font-display font-bold text-xl">TMG</div>
                <div className="text-gold-400 text-[10px] tracking-widest uppercase">Talaat Moustafa Group</div>
              </div>
            </div>
            <p className={`text-white/50 text-sm leading-relaxed max-w-xs ${isAr ? "font-arabic" : ""}`}>
              {msg.description}
            </p>
            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: FacebookIcon, href: "#" },
                { Icon: LinkedinIcon, href: "#" },
                { Icon: InstagramIcon, href: "#" },
                { Icon: TwitterIcon, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-gold-500 hover:text-gold-400 transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-white font-semibold mb-5 text-sm tracking-wider uppercase ${isAr ? "font-arabic" : ""}`}>
              {msg.quick_links}
            </h4>
            <ul className="space-y-3">
              {navLinks(lang, msg).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-white/50 hover:text-gold-400 text-sm transition-colors ${isAr ? "font-arabic" : ""}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`text-white font-semibold mb-5 text-sm tracking-wider uppercase ${isAr ? "font-arabic" : ""}`}>
              {msg.contact_us}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-gold-500 mt-0.5 shrink-0" />
                <span className={`text-white/50 text-sm leading-relaxed ${isAr ? "font-arabic" : ""}`}>
                  {msg.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-gold-500 shrink-0" />
                <a href={`tel:${msg.phone}`} className="text-white/50 hover:text-gold-400 text-sm transition-colors" dir="ltr">
                  {msg.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-gold-500 shrink-0" />
                <a href={`mailto:${msg.email}`} className="text-white/50 hover:text-gold-400 text-sm transition-colors">
                  {msg.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className={`text-white/30 text-xs ${isAr ? "font-arabic" : ""}`}>
            © {new Date().getFullYear()} {msg.company}. {msg.rights}
          </p>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
            <span className="text-white/30 text-xs">Built with excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
