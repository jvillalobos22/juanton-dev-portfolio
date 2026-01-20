import { Space_Grotesk, Source_Serif_4, JetBrains_Mono } from "next/font/google";

// Bold, geometric sans-serif for headlines - dramatic scale contrast
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
});

// Readable serif for body text - optimized for extended reading
export const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

// Monospace for code and technical labels
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});
