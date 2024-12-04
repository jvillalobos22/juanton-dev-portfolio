/* eslint-disable react/no-children-prop */
// app/blog/[slug]/page.js
import ReactMarkdown from "react-markdown";
import { getListOfPosts, getPostContent } from "@/utils/contentHelper";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import markdownStyles from "../../markdown.module.scss";

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
            {content.content}
          </ReactMarkdown>
        </div>
      </main>
    </div>
  );
}

export default Post;
