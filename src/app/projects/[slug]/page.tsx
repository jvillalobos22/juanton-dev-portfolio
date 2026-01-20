import { getListOfProjects, getProjectContent } from "@/utils/contentHelper";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteNavigation from "@/template/SiteNavigation/SiteNavigation";
import ProjectContent from "./ProjectContent";
import styles from "./project.module.scss";

interface IProjectProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getListOfProjects();

  if (!projects || projects.length === 0) {
    return [{ slug: "not-found" }];
  }

  return projects.map((project) => ({
    slug: project.replace(".md", ""),
  }));
}

export async function generateMetadata({ params }: IProjectProps): Promise<Metadata> {
  const { slug } = await params;
  const { data } = getProjectContent(slug);

  return {
    title: `${data.title} — Juan Villalobos`,
    description: data.summary,
  };
}

const ProjectPage = async ({ params }: IProjectProps) => {
  const { slug } = await params;
  const { data, content } = getProjectContent(slug);

  return (
    <div className={styles.page}>
      <SiteNavigation />

      {/* Project Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          {/* Back Link */}
          <Link href="/projects" className={styles.backLink}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>

          {/* Meta */}
          <div className={styles.meta}>
            <span className={styles.metaDate}>
              {new Date(data.date).getFullYear()}
            </span>
          </div>

          {/* Title */}
          <h1 className={styles.title}>{data.title}</h1>

          {/* Summary */}
          <p className={styles.summary}>{data.summary}</p>

          {/* Tags & Links */}
          <div className={styles.headerFooter}>
            <div className={styles.tags}>
              {data.tags?.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>

            <div className={styles.links}>
              {data.githubUrl && (
                <a
                  href={data.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.externalLink}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
              {data.liveUrl && (
                <a
                  href={data.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.externalLink}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                  Live Site
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {data.banner && (
        <div className={styles.imageWrapper}>
          <div className={styles.imageContainer}>
            <Image
              src={`/images/projects/${data.banner}`}
              alt={data.title}
              width={1600}
              height={900}
              priority
              className={styles.image}
            />
          </div>
        </div>
      )}

      {/* Project Content */}
      <main className={styles.main}>
        <ProjectContent projectContent={content} />
      </main>

      {/* Site Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <span className={styles.footerLogo}>JV</span>
          <span className={styles.footerCopy}>
            © {new Date().getFullYear()} Juan Villalobos
          </span>
        </div>
      </footer>
    </div>
  );
};

export default ProjectPage;
