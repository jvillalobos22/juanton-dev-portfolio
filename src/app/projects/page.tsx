import { getListOfProjects, getProjectContent } from "@/utils/contentHelper";
import { Metadata } from "next";
import SiteNavigation from "@/template/SiteNavigation/SiteNavigation";
import ProjectListing from "./ProjectListing";

export const metadata: Metadata = {
  title: "Projects | Portfolio of Juan Villalobos",
};

const ProjectsPage = () => {
  const projects = getListOfProjects();

  return (
    <div className="flex flex-wrap">
      <SiteNavigation />
      <main className="w-full flex flex-wrap lg:flex-nowrap justify-center mt-20 mb-20 px-5 md:px-8">
        <div className="max-w-screen-xl xl:max-w-screen-2xl flex flex-wrap w-full">
          <section className="grid lg:grid-cols-8 lg:gap-12">
            <div className="lg:col-span-2 border-b lg:border-r lg:border-b-0 lg:pr-8 mb-8 lg:mb-0">
              <h1>
                Projects
              </h1>
              <p className="lg:border-b pb-4">
                A collection of my work, <br />
                showcasing development projects and solutions.
              </p>
            </div>
            <div className="lg:col-span-6">
              {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16">
                  {projects.map((project) => {
                    const projectString = project.replace(".md", "");
                    const projectDetails = getProjectContent(projectString);
                    return (
                      <ProjectListing
                        key={projectString}
                        slug={projectString}
                        projectData={projectDetails.data}
                      />
                    );
                  })}
                </div>
              ) : (
                <p>No projects available yet. Check back soon!</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProjectsPage;
