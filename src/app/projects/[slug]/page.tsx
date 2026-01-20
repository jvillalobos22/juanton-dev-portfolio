import { getListOfProjects, getProjectContent } from "@/utils/contentHelper";
import ProjectContent from "./ProjectContent";
import SiteNavigation from "@/template/SiteNavigation/SiteNavigation";
import { Metadata } from "next";

interface IProjectProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getListOfProjects();

  if (!projects || projects.length === 0) {
    return [{ slug: "not-found" }];
  }

  return projects.map((project) => ({
    slug: project.replace(".md", ""),
  }));
}

export async function generateMetadata({ params }: IProjectProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getProjectContent(slug);
  return {
    title: `${content.data.title} | Projects | Portfolio of Juan Villalobos`,
  };
}

const ProjectPage = async ({ params }: IProjectProps) => {
  const { slug } = await params;
  const content = getProjectContent(slug);

  return (
    <div className="flex flex-wrap">
      <SiteNavigation />
      <main className="w-full flex flex-wrap justify-center mt-20 mb-20">
        <ProjectContent projectData={content.data} projectContent={content.content} />
      </main>
    </div>
  );
};

export default ProjectPage;

