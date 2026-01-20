import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import styles from "./project.module.scss";

interface IProjectContentProps {
  projectContent: string;
}

const ProjectContent = ({ projectContent }: IProjectContentProps) => {
  return (
    <article className={styles.article}>
      <ReactMarkdown
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");

            if (match) {
              return (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  className={styles.codeBlock}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            }

            return (
              <code {...props} className={styles.inlineCode}>
                {children}
              </code>
            );
          },
          h1: ({ children }) => <h1 className={styles.h1}>{children}</h1>,
          h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
          h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
          h4: ({ children }) => <h4 className={styles.h4}>{children}</h4>,
          p: ({ children }) => <p className={styles.p}>{children}</p>,
          ul: ({ children }) => <ul className={styles.ul}>{children}</ul>,
          ol: ({ children }) => <ol className={styles.ol}>{children}</ol>,
          li: ({ children }) => <li className={styles.li}>{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className={styles.blockquote}>{children}</blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          hr: () => <hr className={styles.hr} />,
          strong: ({ children }) => (
            <strong className={styles.strong}>{children}</strong>
          ),
          em: ({ children }) => <em className={styles.em}>{children}</em>,
        }}
      >
        {projectContent}
      </ReactMarkdown>
    </article>
  );
};

export default ProjectContent;
