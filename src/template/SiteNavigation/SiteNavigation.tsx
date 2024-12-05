import Image from "next/image";
import Link from "next/link";
import styles from "./SiteNavigation.module.scss";
import { Button } from "@mui/material";
import NavigationMenu from "@/components/molecules/NavigationMenu/NavigationMenu";
import NavigationItem from "@/components/atoms/NavigationItem/NavigationItem";

interface ISiteNavigationProps {}

const SiteNavigation = ({}): ISiteNavigationProps => {
  return (
    <header className="w-full flex flex-wrap justify-center">
      <div className="w-full max-w-screen-lg xl:max-w-screen-2xl mt-2">
        <div className="w-full flex flex-wrap lg:flex-nowrap justify-between">
          <div className={styles.siteNavigationLogo}>
            <Link href="/">
              <Image
                src="/images/juanton-logo-black.png"
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
              <NavigationItem href="#" className="mr-2">
                Resume
              </NavigationItem>
              <li>
                <Button
                  className="w-full mb-3"
                  href="https://mailchi.mp/f5a5cde72458/frontend-development-with-juanton"
                  variant="outlined"
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
