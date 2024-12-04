import { getListOfPosts, getPostContent } from "@/utils/contentHelper";
// import ReactMarkdown from "react-markdown";
// import markdownStyles from "./markdown.module.scss";
import { Metadata } from "next";
import Link from "next/link";
import ArticleListing from "./ArticleListing";

export const metadata: Metadata = {
  title: "Portfolio of Juan Villalobos | Coming Soon",
};

const Home = () => {
  const posts = getListOfPosts();
  console.log("posts", posts);

  return (
    <div className="flex flex-wrap">
      <main className="w-full flex flex-wrap lg:flex-nowrap justify-center mt-20 px-8 md:px-16">
        <div className="max-w-screen-xl xl:max-w-screen-2xl flex flex-wrap w-full">
          <section className="body-content mt-20 grid lg:grid-cols-8 lg:gap-12">
            <div className="lg:col-span-2 border-b lg:border-r lg:border-b lg:pr-8">
              <h1>
                Code
                <br />& Craft
              </h1>
              <p className="lg:border-b pb-4">
                Thoughts on mastering development, design, <br />
                and life's endless learning journey.
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16">
                {posts.map((post) => {
                  const postString = post.replace(".md", "");
                  const postDetails = getPostContent(postString);
                  console.log("postDetails", postDetails);
                  return (
                    <ArticleListing
                      key={postString}
                      slug={postString}
                      postData={postDetails.data}
                      postContent={postDetails.content}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
