// app/blog/[slug]/page.js
import ReactMarkdown from "react-markdown";
import markdownStyles from "../../markdown.module.scss";

import { getListOfPosts, getPostContent } from "@/utils/contentHelper";

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

function Post({ params }) {
  const content = getPostContent(params.slug);
  console.log("params", params.slug);
  console.log("content", content);
  return (
    <div className="flex flex-wrap">
      <main className="w-full flex flex-wrap lg:flex-nowrap justify-center mt-20 px-5">
        <div className="max-w-screen-md flex flex-wrap">
          <ReactMarkdown className={markdownStyles.markdownContent}>
            {content.content}
          </ReactMarkdown>
        </div>
      </main>
    </div>
  );
}

export default Post;
