"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteNavigation from "@/template/SiteNavigation/SiteNavigation";
import styles from "./home.module.scss";
import { IHomeContent } from "@/interface/homeContent";

interface ProjectData {
  slug: string;
  title: string;
  summary: string;
  banner?: string;
  tags?: string[];
}

interface PostData {
  slug: string;
  title: string;
  summary: string;
  date: string;
}

interface HomeContentProps {
  projects: ProjectData[];
  posts: PostData[];
  content: IHomeContent;
}

const HomeContent = ({ projects, posts, content }: HomeContentProps) => {
  const [currentSection, setCurrentSection] = useState(0);

  // Handle body scroll lock for snap scrolling on non-mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;

      if (!mobile) {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  // Track current section for indicators
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-section"));
            setCurrentSection(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll("[data-section]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.page}>
      <SiteNavigation />

      {/* Section Indicators */}
      <div className={styles.indicators}>
        {[0, 1, 2, 3, 4].map((index) => (
          <button
            key={index}
            className={`${styles.indicator} ${currentSection === index ? styles.indicatorActive : ""}`}
            onClick={() => {
              document.querySelector(`[data-section="${index}"]`)?.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className={styles.hero} data-section="0">
        <div className={styles.heroContent}>
          {/* Decorative Elements */}
          <div className={styles.heroCoord}>
            <span className={styles.coordLabel}>{content.hero.coordinates.latitude}</span>
            <span className={styles.coordLabel}>{content.hero.coordinates.longitude}</span>
          </div>

          {/* Main Hero Text */}
          <div className={styles.heroText}>
            <span className={styles.heroLabel}>{content.hero.roleLabel}</span>
            <h1 className={styles.heroTitle}>
              {content.hero.titleLines.map((line, index) => (
                <span key={index} className={styles.heroLine}>
                  {line}
                  {index === content.hero.titleLines.length - 1 && <span className={styles.accent}>.</span>}
                </span>
              ))}
            </h1>
            <p className={styles.heroSubtitle}>
              {content.hero.subtitle}
            </p>
          </div>

          {/* Hero Image */}
          <div className={styles.heroImage}>
            <div className={styles.heroImageFrame}>
              <Image
                src={content.hero.heroImage.src}
                alt={content.hero.heroImage.alt}
                width={500}
                height={500}
                priority
                className={styles.heroPhoto}
              />
            </div>
            <div className={styles.heroImageCaption}>
              <span className={styles.captionLabel}>{content.hero.currentPosition.label}</span>
              <span className={styles.captionText}>{content.hero.currentPosition.text}</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={styles.scrollIndicator}>
          <span className={styles.scrollText}>Scroll</span>
          <div className={styles.scrollLine}></div>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.about} data-section="1">
        <div className={styles.aboutGrid}>
          <div className={styles.aboutLabel}>
            <span className={styles.sectionNum}>{content.about.sectionNum}</span>
            <span className={styles.sectionTitle}>{content.about.sectionTitle}</span>
          </div>
          <div className={styles.aboutContent}>
            <p className={styles.aboutLead}>
              {content.about.leadParagraph}
            </p>
            <p className={styles.aboutBody}>
              {content.about.bodyParagraph}
            </p>
            <div className={styles.aboutStats}>
              {content.about.stats.map((stat, index) => (
                <div key={index} className={styles.stat}>
                  <span className={styles.statNumber}>{stat.number}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className={styles.work} data-section="2">
        <div className={styles.workInner}>
          <div className={styles.workHeader}>
            <div className={styles.workLabel}>
              <span className={styles.sectionNum}>{content.work.sectionNum}</span>
              <span className={styles.sectionTitle}>{content.work.sectionTitle}</span>
            </div>
            <Link href="/projects" className={styles.workLink}>
              {content.work.ctaText}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>
          </div>

          <div className={styles.workGrid}>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <Link href={`/projects/${project.slug}`} key={project.slug} className={styles.workCard}>
                  <div className={styles.workCardNum}>{String(index + 1).padStart(2, "0")}</div>
                  {project.banner && (
                    <div className={styles.workCardImage}>
                      <Image
                        src={`/images/projects/${project.banner}`}
                        alt={project.title}
                        width={800}
                        height={500}
                        className={styles.workCardImg}
                      />
                    </div>
                  )}
                  <div className={styles.workCardContent}>
                    <h3 className={styles.workCardTitle}>{project.title}</h3>
                    <p className={styles.workCardDesc}>{project.summary}</p>
                    <div className={styles.workCardTags}>
                      {project.tags?.slice(0, 3).map((tag) => (
                        <span key={tag} className={styles.workCardTag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className={styles.workEmpty}>
                <p>{content.work.emptyStateMessage}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className={styles.blog} data-section="3">
        <div className={styles.blogInner}>
          <div className={styles.blogHeader}>
            <div className={styles.blogLabel}>
              <span className={styles.sectionNum}>{content.blog.sectionNum}</span>
              <span className={styles.sectionTitle}>{content.blog.sectionTitle}</span>
            </div>
            <Link href="/blog" className={styles.blogLink}>
              {content.blog.ctaText}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>
          </div>

          <div className={styles.blogGrid}>
            {posts.map((post, index) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className={styles.blogCard}>
                <div className={styles.blogCardMeta}>
                  <span className={styles.blogCardNum}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.blogCardDate}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h3 className={styles.blogCardTitle}>{post.title}</h3>
                <p className={styles.blogCardDesc}>{post.summary}</p>
                <span className={styles.blogCardLink}>
                  {content.blog.cardLinkText}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.contact} data-section="4">
        <div className={styles.contactContent}>
          <div className={styles.contactLabel}>
            <span className={styles.sectionNum}>{content.contact.sectionNum}</span>
            <span className={styles.sectionTitle}>{content.contact.sectionTitle}</span>
          </div>
          <h2 className={styles.contactTitle}>
            {content.contact.headingLines[0]}<br />
            <span className={styles.accent}>{content.contact.headingLines[1]}</span>
          </h2>
          <p className={styles.contactText}>
            {content.contact.description}
          </p>
          <div className={styles.contactActions}>
            <a href={`mailto:${content.contact.email}`} className={styles.contactBtn}>
              {content.contact.ctaText}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            <div className={styles.contactSocial}>
              {content.contact.socialLinks.map((link) => (
                <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label={link.label}>
                  {link.platform === "linkedin" && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )}
                  {link.platform === "youtube" && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  )}
                  {link.platform === "github" && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeContent;
