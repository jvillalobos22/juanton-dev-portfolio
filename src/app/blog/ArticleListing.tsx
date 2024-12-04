import { getListOfPosts } from "@/utils/contentHelper";
import styles from "./ArticleListing.module.scss";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Chip, Stack } from "@mui/material";
import classNames from "classnames";

interface IPostData {
  title: string;
  date: Date;
  tags: string[];
  summary: string;
  author: string;
  banner: string;
}

interface IArticleListingProps {
  postContent: string;
  slug: string;
  postData: IPostData;
}

const ArticleListing = ({ postContent, postData, slug }) => {
  console.log("postContent", postContent);
  const { banner, title, summary, author, tags } = postData;
  return (
    <article className="block">
      <Image
        src={`/images/articles/${banner}`}
        alt="Brush stroke image"
        width={2240}
        height={1260}
        priority
        className={classNames("border", styles.articleImage)}
      />
      <div className={styles.articleTags}>
        <Stack direction="row" spacing={1} className="mt-4">
          {tags.map((tag) => (
            <Chip label={tag} color="secondary" className="mr-2 text-xs" />
          ))}
        </Stack>
      </div>
      <Link href={`blog/${slug}`}>
        <h2>{title}</h2>
      </Link>
      <p>{summary}</p>
    </article>
  );
};

export default ArticleListing;
