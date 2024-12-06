/* eslint-disable react/no-children-prop */
// app/blog/[slug]/page.js
import ReactMarkdown from "react-markdown";
import { getListOfPosts, getPostContent } from "@/utils/contentHelper";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import markdownStyles from "../../markdown.module.scss";
import ArticleContent from "./ArticleContent";
import SiteNavigation from "@/template/SiteNavigation/SiteNavigation";

interface IPostProps {
  params: Object;
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

const PostPage = ({ params }): IPostProps => {
  const content = getPostContent(params.slug);

  return (
    <div className="flex flex-wrap">
      <SiteNavigation />
      <main className="w-full flex flex-wrap justify-center">
        <ArticleContent postData={content.data} postContent={content.content} />
      </main>
    </div>
  );
};

export default PostPage;
