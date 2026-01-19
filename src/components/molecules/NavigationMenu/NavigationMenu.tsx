import styles from "./NavigationMenu.module.scss";
import NavigationItem from "@/components/atoms/NavigationItem/NavigationItem";

const NavigationMenu = () => {
  return (
    <ul className={styles.navigationMenu}>
      <NavigationItem href="/projects">Projects</NavigationItem>
      <NavigationItem href="/blog">Blog</NavigationItem>
      <NavigationItem href="/skills">Skills</NavigationItem>
      <NavigationItem href="/about">About</NavigationItem>
      <NavigationItem href="/contact">Contact</NavigationItem>
    </ul>
  );
};

export default NavigationMenu;
