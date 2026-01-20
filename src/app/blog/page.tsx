import { getListOfPosts, getPostContent } from "@/utils/contentHelper";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteNavigation from "@/template/SiteNavigation/SiteNavigation";
import styles from "./blog.module.scss";

export const metadata: Metadata = {
  title: "Blog — Juan Villalobos",
  description: "Thoughts on frontend development, React, TypeScript, and building better web experiences.",
};

const BlogPage = () => {
  const posts = getListOfPosts();

  return (
    <div className={styles.page}>
      <SiteNavigation />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroLabel}>
            <span className={styles.labelNum}>03</span>
            <span className={styles.labelText}>Blog</span>
          </div>
          <h1 className={styles.heroTitle}>
            Code<span className={styles.accent}>&</span>Craft
          </h1>
          <p className={styles.heroSubtitle}>
            Thoughts on mastering development, design, and the endless pursuit of building better interfaces.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className={styles.articles}>
        <div className={styles.articlesHeader}>
          <span className={styles.articlesCount}>{posts.length} Articles</span>
          <div className={styles.articlesFilter}>
            <span className={styles.filterLabel}>All Topics</span>
          </div>
        </div>

        <div className={styles.articlesGrid}>
          {posts.map((post, index) => {
            const slug = post.replace(".md", "");
            const { data } = getPostContent(slug);
            const isFeature = index === 0;

            return (
              <Link
                href={`/blog/${slug}`}
                key={slug}
                className={`${styles.articleCard} ${isFeature ? styles.featured : ""}`}
              >
                <div className={styles.articleNum}>
                  {String(index + 1).padStart(2, "0")}
                </div>

                {data.banner && (
                  <div className={styles.articleImage}>
                    <Image
                      src={`/images/articles/${data.banner}`}
                      alt={data.title}
                      width={800}
                      height={500}
                      className={styles.articleImg}
                    />
                  </div>
                )}

                <div className={styles.articleContent}>
                  <div className={styles.articleMeta}>
                    <span className={styles.articleDate}>
                      {new Date(data.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className={styles.articleDot}>·</span>
                    <span className={styles.articleAuthor}>{data.author}</span>
                  </div>

                  <h2 className={styles.articleTitle}>{data.title}</h2>
                  <p className={styles.articleSummary}>{data.summary}</p>

                  <div className={styles.articleFooter}>
                    <div className={styles.articleTags}>
                      {data.tags?.slice(0, 3).map((tag) => (
                        <span key={tag} className={styles.articleTag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className={styles.articleLink}>
                      Read
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
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

export default BlogPage;
