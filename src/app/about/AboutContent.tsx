"use client";

import Image from "next/image";
import Link from "next/link";
import SiteNavigation from "@/template/SiteNavigation/SiteNavigation";
import SiteFooter from "@/template/SiteFooter/SiteFooter";
import { IAboutPageContent, ISkillItem, ISkillCategory } from "@/interface/aboutContent";
import styles from "./about.module.scss";

interface AboutContentProps {
  content: IAboutPageContent;
  markdownContent: string;
}

const AboutContent = ({ content }: AboutContentProps) => {
  return (
    <div className={styles.page}>
      <SiteNavigation />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          {/* Left Column - Text */}
          <div className={styles.heroText}>
            <span className={styles.heroEyebrow}>{content.hero.eyebrow}</span>
            <h1 className={styles.heroName}>{content.hero.name}</h1>
            <p className={styles.heroTitle}>{content.hero.title}</p>
            <p className={styles.heroStatement}>{content.hero.statement}</p>

            <div className={styles.heroMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Location</span>
                <span className={styles.metaValue}>{content.hero.location}</span>
              </div>
              <div className={styles.metaDivider} />
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Experience</span>
                <span className={styles.metaValue}>{content.hero.experience}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className={styles.heroImage}>
            <div className={styles.imageFrame}>
              <Image
                src={content.hero.profileImage.src}
                alt={content.hero.profileImage.alt}
                width={500}
                height={500}
                priority
                className={styles.profilePhoto}
              />
            </div>
            <div className={styles.imageAccent} />
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className={styles.intro}>
        <div className={styles.introInner}>
          <div className={styles.introHeading}>
            <span className={styles.introMain}>{content.intro.heading}</span>
            <span className={styles.introSub}>{content.intro.subheading}</span>
          </div>
          <p className={styles.introParagraph}>{content.intro.paragraph}</p>
        </div>
      </section>

      {/* Value Props Section */}
      <section className={styles.valueProps}>
        <div className={styles.valuePropsInner}>
          <div className={styles.sectionLabel}>
            <span className={styles.sectionNum}>01</span>
            <span className={styles.sectionTitle}>What I Bring</span>
          </div>

          <div className={styles.valueGrid}>
            {content.valueProps.map((prop, index) => (
              <div key={index} className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  {prop.icon === "bridge" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 21V14M20 21V14M2 14h20M4 14c0-4 4-8 8-8s8 4 8 8" />
                    </svg>
                  )}
                  {prop.icon === "healthcare" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 8v8M8 12h8M12 21a9 9 0 110-18 9 9 0 010 18z" />
                    </svg>
                  )}
                  {prop.icon === "scale" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2M9 14l2 2 4-4M14 2H10a1 1 0 00-1 1v2a1 1 0 001 1h4a1 1 0 001-1V3a1 1 0 00-1-1z" />
                    </svg>
                  )}
                  {prop.icon === "user" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                    </svg>
                  )}
                </div>
                <h3 className={styles.valueTitle}>{prop.title}</h3>
                <p className={styles.valueDesc}>{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={styles.skills}>
        <div className={styles.skillsInner}>
          <div className={styles.sectionLabel}>
            <span className={styles.sectionNum}>02</span>
            <span className={styles.sectionTitle}>Technical Skills</span>
          </div>

          <div className={styles.skillsGrid}>
            {Object.entries(content.skills).map(([key, category]: [string, ISkillCategory]) => (
              <div key={key} className={styles.skillCategory}>
                <h3 className={styles.skillCategoryTitle}>{category.label}</h3>
                <div className={styles.skillList}>
                  {category.items.map((skill: ISkillItem, index: number) => (
                    <div key={index} className={styles.skillItem}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillMeta}>
                        <span className={styles.skillYears}>{skill.years}</span>
                        <span className={`${styles.skillLevel} ${styles[`level${skill.level}`]}`}>
                          {skill.level}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className={styles.metrics}>
        <div className={styles.metricsInner}>
          <div className={styles.sectionLabel}>
            <span className={styles.sectionNum}>03</span>
            <span className={styles.sectionTitle}>Impact & Results</span>
          </div>

          <div className={styles.metricsGrid}>
            {content.metrics.map((metric, index) => (
              <div key={index} className={styles.metricCard}>
                <span className={styles.metricValue}>{metric.value}</span>
                <span className={styles.metricLabel}>{metric.label}</span>
                <span className={styles.metricContext}>{metric.context}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className={styles.philosophy}>
        <div className={styles.philosophyInner}>
          <div className={styles.sectionLabel}>
            <span className={styles.sectionNum}>04</span>
            <span className={styles.sectionTitle}>{content.philosophy.heading}</span>
          </div>

          <div className={styles.philosophyGrid}>
            {content.philosophy.points.map((point, index) => (
              <div key={index} className={styles.philosophyCard}>
                <span className={styles.philosophyNum}>{String(index + 1).padStart(2, "0")}</span>
                <h3 className={styles.philosophyTitle}>{point.title}</h3>
                <p className={styles.philosophyDesc}>{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className={styles.certifications}>
        <div className={styles.certificationsInner}>
          <div className={styles.sectionLabel}>
            <span className={styles.sectionNum}>05</span>
            <span className={styles.sectionTitle}>Certifications</span>
          </div>

          <div className={styles.certGrid}>
            {content.certifications.map((cert, index) => (
              <div key={index} className={styles.certCard}>
                <span className={styles.certYear}>{cert.year}</span>
                <h3 className={styles.certName}>{cert.name}</h3>
                <span className={styles.certIssuer}>{cert.issuer}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaHeading}>{content.cta.heading}</h2>
          <p className={styles.ctaDesc}>{content.cta.description}</p>
          <div className={styles.ctaActions}>
            <a href={`mailto:${content.cta.email}`} className={styles.ctaButton}>
              {content.cta.buttonText}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            <Link href="/projects" className={styles.ctaSecondary}>
              View My Work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default AboutContent;
