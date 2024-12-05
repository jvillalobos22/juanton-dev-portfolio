/* eslint-disable react/no-children-prop */
// app/blog/[slug]/page.js
import ReactMarkdown from "react-markdown";
import { getListOfPosts, getPostContent } from "@/utils/contentHelper";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import markdownStyles from "../../markdown.module.scss";
import ArticleContent from "./ArticleContent";

interface IPostProps {
  params: Object;
}

export async function generateStaticParams() {
  const posts = getListOfPosts();
  console.log(posts);

  if (!posts || posts.length === 0) {
    return [{ slug: "not-found" }];
  }

  return posts.map((post) => ({
    slug: post.replace(".md", ""),
  }));
}

const PostPage = ({ params }): IPostProps => {
  const content = getPostContent(params.slug);
  console.log("params", params.slug);
  console.log("content", content);
  return (
    <div className="flex flex-wrap">
      <main className="w-full flex flex-wrap justify-center">
        <ArticleContent postData={content.data} postContent={content.content} />
      </main>
    </div>
  );
};

export default PostPage;
