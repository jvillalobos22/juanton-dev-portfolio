// app/blog/[slug]/page.js
import { getListOfPosts, getPostContent } from "@/utils/contentHelper";
import ArticleContent from "./ArticleContent";
import SiteNavigation from "@/template/SiteNavigation/SiteNavigation";

interface IPostProps {
  params: object;
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
      <main className="w-full flex flex-wrap justify-center mt-20 mb-20">
        <ArticleContent postData={content.data} postContent={content.content} />
      </main>
    </div>
  );
};

export default PostPage;
