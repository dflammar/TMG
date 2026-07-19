import type { Config } from "tailwindcss";

// Tailwind v4 uses CSS-first configuration via @theme in globals.css
// This file kept for compatibility — main tokens are in globals.css @theme block
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
