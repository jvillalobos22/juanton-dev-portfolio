import { Metadata } from "next";
import { getListOfPosts, getPostContent, getListOfProjects, getProjectContent } from "@/utils/contentHelper";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Juan Villalobos — Frontend Developer",
  description: "Building interfaces that matter. Frontend developer specializing in React, TypeScript, and modern web experiences.",
};

const Home = () => {
  // Get latest posts and projects for featured section
  const postFiles = getListOfPosts().slice(0, 2);
  const projectFiles = getListOfProjects().slice(0, 4);

  const posts = postFiles.map((post) => {
    const slug = post.replace(".md", "");
    const { data } = getPostContent(slug);
    return {
      slug,
      title: data.title,
      summary: data.summary,
      date: String(data.date),
    };
  });

  const projects = projectFiles.map((project) => {
    const slug = project.replace(".md", "");
    const { data } = getProjectContent(slug);
    return {
      slug,
      title: data.title,
      summary: data.summary,
      banner: data.banner,
      tags: data.tags,
    };
  });

  return <HomeContent projects={projects} posts={posts} />;
};

export default Home;
