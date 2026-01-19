/* eslint-disable react/no-children-prop */
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import markdownStyles from "../../markdown.module.scss";
import Image from "next/image";
import classNames from "classnames";
import { IProjectData } from "@/interface/projects";
import styles from "./ProjectContent.module.scss";

interface IProjectContentProps {
  projectData: IProjectData;
  projectContent: string;
}

const ProjectContent = ({ projectData, projectContent }): IProjectContentProps => {
  const { banner, title } = projectData;
  return (
    <>
      {banner && (
        <div className="w-full flex flex-wrap justify-center">
          <div className="max-w-screen-lg flex flex-wrap mb-16">
            <Image
              src={`/images/projects/${banner}`}
              alt={`${title} project banner`}
              width={2240}
              height={1260}
              priority
              className={classNames("border", styles.projectImage)}
            />
          </div>
        </div>
      )}
      <div className="max-w-screen-md flex flex-wrap">
        <ReactMarkdown
          className={markdownStyles.markdownContent}
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");

              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, "")}
                  style={a11yDark}
                  language={match[1]}
                  PreTag="div"
                />
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {projectContent}
        </ReactMarkdown>
      </div>
    </>
  );
};

export default ProjectContent;

