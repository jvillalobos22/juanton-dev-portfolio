import type { Metadata } from "next";
import { spaceGrotesk, sourceSerif, jetbrainsMono } from "./font";
import "./globals.css";

export const metadata: Metadata = {
  title: "Juan Villalobos — Frontend Developer",
  description: "Building interfaces that matter. Frontend developer specializing in React, TypeScript, and modern web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
