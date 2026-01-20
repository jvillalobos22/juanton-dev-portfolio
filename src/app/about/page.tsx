import { Metadata } from "next";
import { getAboutContent } from "@/utils/contentHelper";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About — Juan Villalobos",
  description:
    "Full-stack developer and UI/UX leader with 10+ years building enterprise applications. Expert in React, TypeScript, and design systems.",
};

const AboutPage = () => {
  const { data: aboutContent, content: markdownContent } = getAboutContent();

  return <AboutContent content={aboutContent} markdownContent={markdownContent} />;
};

export default AboutPage;
