import Image from "next/image";
import styles from "./home.module.scss";
import { Button } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import classNames from "classnames";
import { getPageContent } from "@/utils/contentHelper";
import ReactMarkdown from "react-markdown";
import markdownStyles from "./markdown.module.scss";
import { Metadata } from "next";
import SiteNavigation from "@/template/SiteNavigation/SiteNavigation";

export const metadata: Metadata = {
  title: "Portfolio of Juan Villalobos | Coming Soon",
};

const Home = () => {
  const { content } = getPageContent("home");

  return (
    <div className="flex flex-wrap">
      <SiteNavigation />

      <main className="w-full flex flex-wrap lg:flex-nowrap justify-center mt-20 px-5">
        <aside className="mb-5 max-w-min lg:max-w-min lg:mx-16 w-full">
          <div
            className={classNames(
              styles.homeImageColumnContainer,
              "lg:sticky lg:top-20"
            )}
          >
            <div className="relative">
              <div className={styles.homeIntroImage}>
                <Image
                  src="/images/headshot-square-1-transparent.png"
                  alt="Headshot image of Juan Villalobos"
                  width={1080}
                  height={1080}
                  priority
                />
              </div>
              <Image
                src="/images/brushstroke-square-1.png"
                alt="Brush stroke image"
                className={styles.homeImageStroke}
                width={1080}
                height={1080}
                priority
              />
            </div>
            <span className="mb-0 w-full">
              <em>Lead Software Engineer @ IBM</em>
            </span>
            <br />
            <span className="mb-0 w-full">San Francisco, CA</span>
            <span className="mb-0 w-full">@juantonmusic</span>
            <div className={styles.socialLinks}>
              <a
                href="https://www.youtube.com/@juantonmusic"
                target="_blank"
                rel="nofollower"
                title="YouTube Channel Link for Learning with Juanton"
                aria-label="YouTube Channel Link for Learning with Juanton"
              >
                <YouTubeIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/juanavillalobos/"
                target="_blank"
                rel="nofollower"
                title="Linkedin Link for Juan Villalobos"
                aria-label="Linkedin Link for Juan Villalobos"
              >
                <LinkedInIcon />
              </a>
              <a
                href="mailto:juan@juantonmusic.com"
                target="_blank"
                rel="nofollower"
                title="Linkedin Link for Juan Villalobos"
                aria-label="Linkedin Link for Juan Villalobos"
              >
                <MailOutlineIcon />
              </a>
            </div>
          </div>
        </aside>
        <div className="max-w-screen-md flex flex-wrap">
          <header className="body-content">
            <h1 className="mb-4">Hold tight, portfolio site in progress...</h1>
            <p>Just one more git commit... maybe two... or twenty 😅</p>
          </header>
          <section className="body-content mt-20">
            <ReactMarkdown className={markdownStyles.markdownContent}>
              {content}
            </ReactMarkdown>
            {/* <div>
              <h3>Core Values</h3>
              <ul>
                <li>
                  <FavoriteIcon color="primary" className="mb-1" />
                  &nbsp;Mentor at Heart
                </li>
                <li>
                  <MenuBookIcon color="secondary" className="mb-1" />
                  &nbsp;Lifelong Learner
                </li>
                <li>
                  <LiveHelpIcon color="primary" className="mb-1" />
                  &nbsp;Endless Curiosity
                </li>
              </ul>
            </div> */}
          </section>
          <section className="mt-20 body-content">
            <h2>Stay Connected</h2>
            <p>
              Don&apos;t miss the launch! Subscribe to my newsletter for weekly
              insights on JavaScript, React.js, and enterprise development
              practices. I also put out videos and live streams on my design and
              development progress for this portfolio site if you would like to
              follow along.
            </p>

            <div className="mt-10">
              <ul className="flex flex-wrap md:flex-nowrap md:justify-between">
                <li className="w-full mb-3 md:w-1/2 md:pr-2">
                  <Button
                    className="w-full mb-3"
                    href="https://mailchi.mp/f5a5cde72458/frontend-development-with-juanton"
                    variant="contained"
                    color="secondary"
                    target="_blank"
                    rel="nofollower"
                  >
                    Subscribe to my Newsletter
                  </Button>
                </li>
                <li className="w-full mb-3 md:w-1/2 md:pl-2">
                  <Button
                    className="w-full mb-3"
                    href="https://www.youtube.com/@juantonmusic"
                    variant="contained"
                    target="_blank"
                    rel="nofollower"
                  >
                    Follow along on YouTube
                  </Button>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
      <footer className="w-full flex flex-nowrap justify-center mt-20 mb-32">
        <p>
          <em>Development in Progress</em>
        </p>
      </footer>
    </div>
  );
};

export default Home;
