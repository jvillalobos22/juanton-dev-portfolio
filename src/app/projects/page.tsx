import { Metadata } from "next";
import SiteNavigation from "@/template/SiteNavigation/SiteNavigation";

export const metadata: Metadata = {
  title: "Projects | Portfolio of Juan Villalobos",
};

const ProjectsPage = () => {
  return (
    <div className="flex flex-wrap">
      <SiteNavigation />
      <main className="w-full flex flex-wrap lg:flex-nowrap justify-center mt-20 px-8 md:px-16">
        <div className="max-w-screen-xl xl:max-w-screen-2xl flex flex-wrap w-full">
          <h1>Projects</h1>
        </div>
      </main>
    </div>
  );
};

export default ProjectsPage;
