import { Open_Sans, Domine } from "next/font/google";

export const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const domine = Domine({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});
