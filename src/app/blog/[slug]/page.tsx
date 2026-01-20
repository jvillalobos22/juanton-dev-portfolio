import { getListOfPosts, getPostContent } from "@/utils/contentHelper";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteNavigation from "@/template/SiteNavigation/SiteNavigation";
import SiteFooter from "@/template/SiteFooter/SiteFooter";
import ArticleContent from "./ArticleContent";
import styles from "./article.module.scss";

interface IPostProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getListOfPosts();

  if (!posts || posts.length === 0) {
    return [{ slug: "not-found" }];
  }

  return posts.map((post) => ({
    slug: post.replace(".md", ""),
  }));
}

export async function generateMetadata({
  params,
}: IPostProps): Promise<Metadata> {
  const { slug } = await params;
  const { data } = getPostContent(slug);

  return {
    title: `${data.title} — Juan Villalobos`,
    description: data.summary,
  };
}

const PostPage = async ({ params }: IPostProps) => {
  const { slug } = await params;
  const { data, content } = getPostContent(slug);

  return (
    <div className={styles.page}>
      <SiteNavigation />

      {/* Article Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          {/* Back Link */}
          <Link href="/blog" className={styles.backLink}>
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
            Back to Blog
          </Link>

          {/* Meta */}
          <div className={styles.meta}>
            <span className={styles.metaDate}>
              {new Date(data.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className={styles.metaDot}>·</span>
            <span className={styles.metaAuthor}>By {data.author}</span>
          </div>

          {/* Title */}
          <h1 className={styles.title}>{data.title}</h1>

          {/* Tags */}
          <div className={styles.tags}>
            {data.tags?.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {data.banner && (
        <div className={styles.imageWrapper}>
          <div className={styles.imageContainer}>
            <Image
              src={`/images/articles/${data.banner}`}
              alt={data.title}
              width={1600}
              height={900}
              priority
              className={styles.image}
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <main className={styles.main}>
        <ArticleContent postContent={content} />
      </main>

      {/* Article Footer */}
      <footer className={styles.articleFooter}>
        <div className={styles.articleFooterContent}>
          <div className={styles.authorCard}>
            <div className={styles.authorInfo}>
              <span className={styles.authorLabel}>Written by</span>
              <span className={styles.authorName}>{data.author}</span>
              <span className={styles.authorRole}>Full-Stack Developer</span>
            </div>
          </div>

          <div className={styles.shareSection}>
            <span className={styles.shareLabel}>Share this article</span>
            <div className={styles.shareLinks}>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(data.title)}&url=${encodeURIComponent(`https://juanton.dev/blog/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareLink}
                aria-label="Share on Twitter"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://juanton.dev/blog/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareLink}
                aria-label="Share on LinkedIn"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <SiteFooter />
    </div>
  );
};

export default PostPage;
