import Image from "next/image";
import styles from "./home.module.scss";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Button } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import classNames from "classnames";
import { getListOfPosts, getPageContent } from "@/utils/contentHelper";
// import BlogIndex from "../../components/BlogIndex";
import ReactMarkdown from "react-markdown";
import markdownStyles from "./markdown.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio of Juan Villalobos | Coming Soon",
};

const Home = () => {
  const posts = getListOfPosts();
  console.log(posts);

  const { content } = getPageContent("home");
  console.log(content);

  return (
    <div className="flex flex-wrap">
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
                <YouTubeIcon alt="YouTube Channel Link for Learning with Juanton" />
              </a>
              <a
                href="https://www.linkedin.com/in/juanavillalobos/"
                target="_blank"
                rel="nofollower"
                title="Linkedin Link for Juan Villalobos"
                aria-label="Linkedin Link for Juan Villalobos"
              >
                <LinkedInIcon alt="Linkedin Link for Juan Villalobos" />
              </a>
              <a
                href="mailto:juan@juantonmusic.com"
                target="_blank"
                rel="nofollower"
                title="Linkedin Link for Juan Villalobos"
                aria-label="Linkedin Link for Juan Villalobos"
              >
                <MailOutlineIcon alt="Email Juan Villalobos" />
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
            {/* <h2>Hi, I&apos;m Juan Villalobos aka @JuantonMusic 👋</h2>
            <p>
              I&apos;m a Lead Software Engineer with over a decade of experience
              crafting web applications and guiding development teams to
              success.
            </p>
            <p>
              When I&apos;m not leading development teams or architecting web
              applications, you&apos;ll find me sharing my passion for software
              engineering with the developer community. With over a decade of
              experience in JavaScript, React.js, and Node.js, I&apos;ve
              discovered that the best designed applications and codebases are a
              reflection of our personal life stories – and I&apos;m here to
              help you share yours.
            </p>
            <div className="mt-20">
              <h3>Beyond the Code</h3>
              <ul>
                <li>
                  <strong>Music & Tech:</strong> Tech House DJ and producer,
                  bringing rhythm to both code and music
                </li>
                <li>
                  <strong>Sports Coaching:</strong> High school Wrestling and
                  Golf coach, passionate about mentoring youth
                </li>
                <li>
                  <strong>Community Builder:</strong> Bringing people together
                  through tech, sports, and music
                </li>
                <li>
                  <strong>Multi-disciplined:</strong> Applying lessons from the
                  golf course and DJ booth to software engineering
                </li>
              </ul>
            </div>

            <div>
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
          {/* <section className="body-content mt-20">
            <h2>What&apos;s Coming?</h2>

            <article>
              <h3>Technical Excellence</h3>
              <p>
                Witness software craftsmanship in action through a portfolio
                that&apos;s not just a showcase, but a testament to modern
                development practices and my core development values.
              </p>
            </article>

            <article>
              <h3>Interactive Storytelling</h3>
              <p>
                Experience projects through immersive narratives that reveal the
                journey, decisions, and learning behind each development
                milestone.
              </p>
            </article>

            <article>
              <h3>Journey Together</h3>
              <p>
                Let&apos;s grow together as I share insights from real-world
                experiences leading development teams and conducting design
                workshops.
              </p>
            </article>
          </section> */}
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
