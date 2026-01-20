export interface IAboutHeroImage {
  src: string;
  alt: string;
}

export interface IAboutHero {
  eyebrow: string;
  name: string;
  title: string;
  statement: string;
  location: string;
  experience: string;
  profileImage: IAboutHeroImage;
}

export interface IAboutIntro {
  heading: string;
  subheading: string;
  paragraph: string;
}

export interface IValueProp {
  icon: string;
  title: string;
  description: string;
}

export interface ISkillItem {
  name: string;
  level: string;
  years: string;
}

export interface ISkillCategory {
  label: string;
  items: ISkillItem[];
}

export interface ISkills {
  frontend: ISkillCategory;
  backend: ISkillCategory;
  design: ISkillCategory;
  infrastructure: ISkillCategory;
}

export interface IMetric {
  value: string;
  label: string;
  context: string;
}

export interface ICertification {
  name: string;
  year: string;
  issuer: string;
}

export interface IPhilosophyPoint {
  title: string;
  description: string;
}

export interface IPhilosophy {
  heading: string;
  points: IPhilosophyPoint[];
}

export interface IAboutCta {
  heading: string;
  description: string;
  buttonText: string;
  email: string;
}

export interface IAboutPageContent {
  hero: IAboutHero;
  intro: IAboutIntro;
  valueProps: IValueProp[];
  skills: ISkills;
  metrics: IMetric[];
  certifications: ICertification[];
  philosophy: IPhilosophy;
  cta: IAboutCta;
}
