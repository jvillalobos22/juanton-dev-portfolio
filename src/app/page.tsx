import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import SiteNavigation from "@/template/SiteNavigation/SiteNavigation";
import { getListOfPosts, getPostContent, getListOfProjects, getProjectContent } from "@/utils/contentHelper";
import styles from "./home.module.scss";

export const metadata: Metadata = {
  title: "Juan Villalobos — Frontend Developer",
  description: "Building interfaces that matter. Frontend developer specializing in React, TypeScript, and modern web experiences.",
};

const Home = () => {
  // Get latest posts and projects for featured section
  const posts = getListOfPosts().slice(0, 2);
  const projects = getListOfProjects().slice(0, 2);

  return (
    <div className={styles.page}>
      <SiteNavigation />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          {/* Decorative Elements */}
          <div className={styles.heroCoord}>
            <span className={styles.coordLabel}>37.7749° N</span>
            <span className={styles.coordLabel}>122.4194° W</span>
          </div>

          {/* Main Hero Text */}
          <div className={styles.heroText}>
            <span className={styles.heroLabel}>Frontend Developer</span>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroLine}>Building</span>
              <span className={styles.heroLine}>
                interfaces<span className={styles.accent}>.</span>
              </span>
            </h1>
            <p className={styles.heroSubtitle}>
              Crafting thoughtful digital experiences with React, TypeScript, and a
              relentless focus on performance and accessibility.
            </p>
          </div>

          {/* Hero Image */}
          <div className={styles.heroImage}>
            <div className={styles.heroImageFrame}>
              <Image
                src="/images/headshot-square-1-transparent.png"
                alt="Juan Villalobos"
                width={500}
                height={500}
                priority
                className={styles.heroPhoto}
              />
            </div>
            <div className={styles.heroImageCaption}>
              <span className={styles.captionLabel}>Currently</span>
              <span className={styles.captionText}>Lead Engineer @ IBM</span>
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
      <section className={styles.about}>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutLabel}>
            <span className={styles.sectionNum}>01</span>
            <span className={styles.sectionTitle}>About</span>
          </div>
          <div className={styles.aboutContent}>
            <p className={styles.aboutLead}>
              I&apos;m Juan, a frontend developer with 8+ years of experience building
              scalable web applications for enterprise clients. I believe great interfaces
              are invisible—they just work.
            </p>
            <p className={styles.aboutBody}>
              Currently leading frontend architecture at IBM, where I focus on design
              systems, performance optimization, and mentoring the next generation of
              developers. When I&apos;m not coding, you&apos;ll find me creating content
              about modern web development.
            </p>
            <div className={styles.aboutStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>8+</span>
                <span className={styles.statLabel}>Years Experience</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>50+</span>
                <span className={styles.statLabel}>Projects Delivered</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>10M+</span>
                <span className={styles.statLabel}>Users Impacted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className={styles.work}>
        <div className={styles.workHeader}>
          <div className={styles.workLabel}>
            <span className={styles.sectionNum}>02</span>
            <span className={styles.sectionTitle}>Selected Work</span>
          </div>
          <Link href="/projects" className={styles.workLink}>
            View All Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </Link>
        </div>

        <div className={styles.workGrid}>
          {projects.length > 0 ? (
            projects.map((project, index) => {
              const slug = project.replace(".md", "");
              const { data } = getProjectContent(slug);
              return (
                <Link href={`/projects/${slug}`} key={slug} className={styles.workCard}>
                  <div className={styles.workCardNum}>{String(index + 1).padStart(2, "0")}</div>
                  {data.banner && (
                    <div className={styles.workCardImage}>
                      <Image
                        src={`/images/projects/${data.banner}`}
                        alt={data.title}
                        width={800}
                        height={500}
                        className={styles.workCardImg}
                      />
                    </div>
                  )}
                  <div className={styles.workCardContent}>
                    <h3 className={styles.workCardTitle}>{data.title}</h3>
                    <p className={styles.workCardDesc}>{data.summary}</p>
                    <div className={styles.workCardTags}>
                      {data.tags?.slice(0, 3).map((tag) => (
                        <span key={tag} className={styles.workCardTag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className={styles.workEmpty}>
              <p>Projects coming soon...</p>
            </div>
          )}
        </div>
      </section>

      {/* Blog Section */}
      <section className={styles.blog}>
        <div className={styles.blogHeader}>
          <div className={styles.blogLabel}>
            <span className={styles.sectionNum}>03</span>
            <span className={styles.sectionTitle}>Latest Writing</span>
          </div>
          <Link href="/blog" className={styles.blogLink}>
            Read All Posts
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </Link>
        </div>

        <div className={styles.blogGrid}>
          {posts.map((post, index) => {
            const slug = post.replace(".md", "");
            const { data } = getPostContent(slug);
            return (
              <Link href={`/blog/${slug}`} key={slug} className={styles.blogCard}>
                <div className={styles.blogCardMeta}>
                  <span className={styles.blogCardNum}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.blogCardDate}>
                    {new Date(data.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h3 className={styles.blogCardTitle}>{data.title}</h3>
                <p className={styles.blogCardDesc}>{data.summary}</p>
                <span className={styles.blogCardLink}>
                  Read Article
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.contact}>
        <div className={styles.contactContent}>
          <div className={styles.contactLabel}>
            <span className={styles.sectionNum}>04</span>
            <span className={styles.sectionTitle}>Get in Touch</span>
          </div>
          <h2 className={styles.contactTitle}>
            Let&apos;s build something<br />
            <span className={styles.accent}>great together.</span>
          </h2>
          <p className={styles.contactText}>
            Available for freelance projects, consulting, and interesting conversations
            about frontend development.
          </p>
          <div className={styles.contactActions}>
            <a href="mailto:hello@juanton.dev" className={styles.contactBtn}>
              Start a Conversation
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            <div className={styles.contactSocial}>
              <a href="https://www.linkedin.com/in/juanavillalobos/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@juantonmusic" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://github.com/jvillalobos22" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLeft}>
            <span className={styles.footerLogo}>JV</span>
            <span className={styles.footerCopy}>© {new Date().getFullYear()} Juan Villalobos</span>
          </div>
          <div className={styles.footerRight}>
            <span className={styles.footerNote}>Built with Next.js & passion</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
