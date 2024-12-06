/* eslint-disable react/no-children-prop */
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import markdownStyles from "../../markdown.module.scss";
// import { Metadata } from "next";
import Image from "next/image";
// import Link from "next/link";
// import { Chip, Stack } from "@mui/material";
import classNames from "classnames";
import { IPostData } from "@/interface/posts";
import styles from "./ArticleContent.module.scss";

interface IArticleContentProps {
  postData: IPostData;
  postContent: string;
}

const ArticleContent = ({ postData, postContent }): IArticleContentProps => {
  const { banner, title, summary, author, tags } = postData;
  return (
    <>
      <div className="w-full flex flex-wrap justify-center">
        <div className="max-w-screen-lg flex flex-wrap mt-20 mb-16">
          <Image
            src={`/images/articles/${banner}`}
            alt="Brush stroke image"
            width={2240}
            height={1260}
            priority
            className={classNames("border", styles.articleImage)}
          />
        </div>
      </div>
      <div className="max-w-screen-md flex flex-wrap">
        <ReactMarkdown
          className={markdownStyles.markdownContent}
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");

              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, "")}
                  style={a11yDark}
                  language={match[1]}
                  PreTag="div"
                />
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {postContent}
        </ReactMarkdown>
      </div>
    </>
  );
};

export default ArticleContent;
