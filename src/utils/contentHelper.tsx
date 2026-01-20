import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { IPostData } from "@/interface/posts";
import { IProjectData } from "@/interface/projects";
import { IHomeContent } from "@/interface/homeContent";
import { IAboutPageContent } from "@/interface/aboutContent";

export const getListOfPosts = () => {
  const folder = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(folder);
  return files.filter((file) => {
    console.log("file", file);
    return file.endsWith(".md");
  });
};

export const getPostContent = (slug: string): { data: IPostData; content: string } => {
  const file = path.join(process.cwd(), "posts", slug) + ".md";
  // TODO: add try/catch to redirect user to 404 if page fails to find file with slug
  const content = fs.readFileSync(file, "utf8");
  const parsed = matter(content);
  return { data: parsed.data as IPostData, content: parsed.content };
};

export const getPageContent = (slug: string) => {
  const file = path.join(process.cwd(), "pages", slug) + ".md";
  // TODO: add try/catch to redirect user to 404 if page fails to find file with slug
  const content = fs.readFileSync(file, "utf8");
  return matter(content);
};

export const getListOfProjects = () => {
  const folder = path.join(process.cwd(), "projects");
  if (!fs.existsSync(folder)) {
    return [];
  }
  const files = fs.readdirSync(folder);
  return files.filter((file) => {
    return file.endsWith(".md");
  });
};

export const getProjectContent = (slug: string): { data: IProjectData; content: string } => {
  const file = path.join(process.cwd(), "projects", slug) + ".md";
  // TODO: add try/catch to redirect user to 404 if page fails to find file with slug
  const content = fs.readFileSync(file, "utf8");
  const parsed = matter(content);
  return { data: parsed.data as IProjectData, content: parsed.content };
};

export const getHomeContent = (): { data: IHomeContent; content: string } => {
  const file = path.join(process.cwd(), "pages", "home.md");
  const content = fs.readFileSync(file, "utf8");
  const parsed = matter(content);
  return { data: parsed.data as IHomeContent, content: parsed.content };
};

export const getAboutContent = (): { data: IAboutPageContent; content: string } => {
  const file = path.join(process.cwd(), "pages", "about.md");
  const content = fs.readFileSync(file, "utf8");
  const parsed = matter(content);
  return { data: parsed.data as IAboutPageContent, content: parsed.content };
};
