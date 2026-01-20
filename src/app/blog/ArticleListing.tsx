// import { getListOfPosts } from "@/utils/contentHelper";
// import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Chip, Stack } from "@mui/material";
import classNames from "classnames";
import { IPostData } from "@/interface/posts";
import styles from "./ArticleListing.module.scss";

interface IArticleListingProps {
  postContent: string;
  slug: string;
  postData: IPostData;
}

const ArticleListing = ({
  postContent,
  postData,
  slug,
}: IArticleListingProps) => {
  console.log("postContent", postContent);
  const { banner, title, summary, author, tags } = postData;
  console.log("author", author);
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
            <Chip
              key={tag}
              label={tag}
              color="secondary"
              className="mr-2 text-xs"
            />
          ))}
        </Stack>
      </div>
      <Link href={`blog/${slug}`}>
        <h2 className="h4 mt-2 mb-2">{title}</h2>
      </Link>
      <p>{summary}</p>
    </article>
  );
};

export default ArticleListing;
