import { getListOfProjects, getProjectContent } from "@/utils/contentHelper";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteNavigation from "@/template/SiteNavigation/SiteNavigation";
import SiteFooter from "@/template/SiteFooter/SiteFooter";
import styles from "./projects.module.scss";

export const metadata: Metadata = {
  title: "Projects — Juan Villalobos",
  description:
    "A collection of frontend development projects showcasing React, TypeScript, and modern web solutions.",
};

const ProjectsPage = () => {
  const projects = getListOfProjects();

  return (
    <div className={styles.page}>
      <SiteNavigation />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroLabel}>
            <span className={styles.labelNum}>01</span>
            <span className={styles.labelText}>Projects</span>
          </div>
          <h1 className={styles.heroTitle}>
            Selected
            <br />
            Work
            <span className={styles.accent}>.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            A curated collection of projects showcasing frontend development,
            design systems, and modern web solutions.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className={styles.projects}>
        <div className={styles.projectsHeader}>
          <span className={styles.projectsCount}>
            {projects.length} Projects
          </span>
        </div>

        {projects.length > 0 ? (
          <div className={styles.projectsGrid}>
            {projects.map((project, index) => {
              const slug = project.replace(".md", "");
              const { data } = getProjectContent(slug);

              return (
                <Link
                  href={`/projects/${slug}`}
                  key={slug}
                  className={styles.projectCard}
                >
                  <div className={styles.projectNum}>
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {data.banner && (
                    <div className={styles.projectImage}>
                      <Image
                        src={`/images/projects/${data.banner}`}
                        alt={data.title}
                        width={800}
                        height={500}
                        className={styles.projectImg}
                      />
                    </div>
                  )}

                  <div className={styles.projectContent}>
                    <div className={styles.projectMeta}>
                      <span className={styles.projectDate}>
                        {new Date(data.date).getFullYear()}
                      </span>
                    </div>

                    <h2 className={styles.projectTitle}>{data.title}</h2>
                    <p className={styles.projectSummary}>{data.summary}</p>

                    <div className={styles.projectFooter}>
                      <div className={styles.projectTags}>
                        {data.tags?.slice(0, 3).map((tag) => (
                          <span key={tag} className={styles.projectTag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className={styles.projectLink}>
                        View Project
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>Projects coming soon. Check back later!</p>
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
};

export default ProjectsPage;
