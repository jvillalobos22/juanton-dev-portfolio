import { Metadata } from "next";
import { getAboutContent } from "@/utils/contentHelper";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About — Juan Villalobos",
  description:
    "Engineering Lead and Frontend Architect with 10+ years building enterprise systems. I bridge design and engineering to create architectures that scale teams.",
};

const AboutPage = () => {
  const { data: aboutContent, content: markdownContent } = getAboutContent();

  return <AboutContent content={aboutContent} markdownContent={markdownContent} />;
};

export default AboutPage;
