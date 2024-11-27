// helpers/contentHelpers.js

import path from "path";
import fs from "fs";
import matter from "gray-matter";

export const getListOfPosts = () => {
  const folder = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(folder);
  return files.filter((file) => file.endsWith(".md"));
};

export const getPostContent = (slug: string) => {
  const file = path.join(process.cwd(), "posts", slug) + ".md";
  // TODO: add try/catch to redirect user to 404 if page fails to find file with slug
  const content = fs.readFileSync(file, "utf8");
  return matter(content);
};

export const getPageContent = (slug: string) => {
  const file = path.join(process.cwd(), "pages", slug) + ".md";
  // TODO: add try/catch to redirect user to 404 if page fails to find file with slug
  const content = fs.readFileSync(file, "utf8");
  return matter(content);
};
