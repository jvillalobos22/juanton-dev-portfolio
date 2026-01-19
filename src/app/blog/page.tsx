import { getListOfPosts, getPostContent } from "@/utils/contentHelper";
import { Metadata } from "next";
import Link from "next/link";
import ArticleListing from "./ArticleListing";
import SiteNavigation from "@/template/SiteNavigation/SiteNavigation";

export const metadata: Metadata = {
  title: "Portfolio of Juan Villalobos | Coming Soon",
};

const BlogPage = () => {
  const posts = getListOfPosts();

  return (
    <div className="flex flex-wrap">
      <SiteNavigation />
      <main className="w-full flex flex-wrap lg:flex-nowrap justify-center mt-20 mb-20 px-5 md:px-8">
        <div className="max-w-screen-xl xl:max-w-screen-2xl flex flex-wrap w-full">
          <section className="grid lg:grid-cols-8 lg:gap-12">
            <div className="lg:col-span-2 border-b lg:border-r lg:border-b-0 lg:pr-8 mb-8 lg:mb-0">
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

export default BlogPage;
