import Image from "next/image";
import Link from "next/link";
import { Chip, Stack } from "@mui/material";
import classNames from "classnames";
import { IProjectData } from "@/interface/projects";
import styles from "./ProjectListing.module.scss";

interface IProjectListingProps {
  projectContent: string;
  slug: string;
  projectData: IProjectData;
}

const ProjectListing = ({
  projectContent,
  projectData,
  slug,
}): IProjectListingProps => {
  const { banner, title, summary, tags } = projectData;
  return (
    <article className="block">
      {banner && (
        <Image
          src={`/images/projects/${banner}`}
          alt={`${title} project image`}
          width={2240}
          height={1260}
          priority
          className={classNames("border", styles.projectImage)}
        />
      )}
      {tags && tags.length > 0 && (
        <div className={styles.projectTags}>
          <Stack direction="row" spacing={1} className="mt-4">
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                color="secondary"
                className="mr-2 text-xs"
              />
            ))}
          </Stack>
        </div>
      )}
      <Link href={`projects/${slug}`}>
        <h2 className="h4 mt-2 mb-2">{title}</h2>
      </Link>
      <p>{summary}</p>
    </article>
  );
};

export default ProjectListing;

