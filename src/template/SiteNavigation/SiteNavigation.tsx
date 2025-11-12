import Image from "next/image";
import Link from "next/link";
import styles from "./SiteNavigation.module.scss";
import { Button, useMediaQuery } from "@mui/material";
import NavigationMenu from "@/components/molecules/NavigationMenu/NavigationMenu";
import NavigationItem from "@/components/atoms/NavigationItem/NavigationItem";

interface ISiteNavigationProps {}

const SiteNavigation = ({}): ISiteNavigationProps => {
  return (
    <header className="w-full flex flex-wrap justify-center">
      <div className="w-full max-w-screen-2l px-5 lg:px-8 mt-2">
        <div className="w-full flex flex-wrap lg:flex-nowrap justify-between">
          <div className={styles.siteNavigationLogo}>
            <Link href="/">
              <Image
                src="/images/juanton-logo-black.png"
                className={styles.lightModeImage}
                alt="Juanton Logo"
                width={3300}
                height={2550}
                priority
              />
              <Image
                src="/images/juanton-logo-white.png"
                className={styles.darkModeImage}
                alt="Juanton Logo"
                width={3300}
                height={2550}
                priority
              />
            </Link>
          </div>
          <nav className={styles.siteNavigationMenu}>
            <NavigationMenu />
            <ul>
              <NavigationItem href="#">Resume</NavigationItem>
              <li>
                <Button
                  className="w-full mb-3"
                  href="https://mailchi.mp/f5a5cde72458/frontend-development-with-juanton"
                  variant="contained"
                  color="primary"
                  target="_blank"
                  rel="nofollower"
                >
                  Newsletter
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default SiteNavigation;
