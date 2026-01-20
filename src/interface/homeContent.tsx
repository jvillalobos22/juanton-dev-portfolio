export interface IHeroCoordinates {
  latitude: string;
  longitude: string;
}

export interface IHeroPosition {
  label: string;
  text: string;
}

export interface IHeroImage {
  src: string;
  alt: string;
}

export interface IHeroContent {
  roleLabel: string;
  titleLines: string[];
  subtitle: string;
  coordinates: IHeroCoordinates;
  currentPosition: IHeroPosition;
  heroImage: IHeroImage;
}

export interface IStat {
  number: string;
  label: string;
}

export interface IAboutContent {
  sectionNum: string;
  sectionTitle: string;
  leadParagraph: string;
  bodyParagraph: string;
  stats: IStat[];
}

export interface IWorkContent {
  sectionNum: string;
  sectionTitle: string;
  ctaText: string;
  emptyStateMessage: string;
}

export interface IBlogContent {
  sectionNum: string;
  sectionTitle: string;
  ctaText: string;
  cardLinkText: string;
}

export interface ISocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface IContactContent {
  sectionNum: string;
  sectionTitle: string;
  headingLines: string[];
  description: string;
  ctaText: string;
  email: string;
  socialLinks: ISocialLink[];
}

export interface IHomeContent {
  hero: IHeroContent;
  about: IAboutContent;
  work: IWorkContent;
  blog: IBlogContent;
  contact: IContactContent;
}
