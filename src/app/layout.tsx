import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TMG – Talaat Moustafa Group | مجموعة طلعت مصطفى",
    template: "%s | TMG",
  },
  description:
    "Talaat Moustafa Group – Egypt's leading real estate developer. Explore careers, iconic projects like Madinaty and SouthMED, and join a team that's building Egypt's future.",
  keywords: ["TMG", "Talaat Moustafa", "مجموعة طلعت مصطفى", "real estate Egypt", "Madinaty", "SouthMED", "careers"],
  openGraph: {
    title: "TMG – Talaat Moustafa Group",
    description: "Egypt's leading real estate developer.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;600;700;800&family=Cairo:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
