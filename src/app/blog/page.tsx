import { getListOfPosts } from "@/utils/contentHelper";
// import ReactMarkdown from "react-markdown";
// import markdownStyles from "./markdown.module.scss";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portfolio of Juan Villalobos | Coming Soon",
};

const Home = () => {
  const posts = getListOfPosts();
  console.log("posts", posts);

  return (
    <div className="flex flex-wrap">
      <main className="w-full flex flex-wrap lg:flex-nowrap justify-center mt-20 px-5">
        <div className="max-w-screen-md flex flex-wrap">
          <section className="body-content mt-20">
            {/* <ReactMarkdown className={markdownStyles.markdownContent}>
              {content}
            </ReactMarkdown> */}
            {posts.map((post) => (
              <article key={post}>
                <Link href={`blog/${post.replace(".md", "")}`}>{post}</Link>
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
