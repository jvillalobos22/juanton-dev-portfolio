import Image from "next/image";
import Link from "next/link";
import styles from "./NavigationMenu.module.scss";
import { Button } from "@mui/material";
import NavigationItem from "@/components/atoms/NavigationItem/NavigationItem";

interface INavigationMenuProps {}

const NavigationMenu = ({}): INavigationMenuProps => {
  return (
    <ul className={styles.navigationMenu}>
      <NavigationItem href="projects">Projects</NavigationItem>
      <NavigationItem href="blog">Blog</NavigationItem>
      <NavigationItem href="skills">Skills</NavigationItem>
      <NavigationItem href="about">About</NavigationItem>
      <NavigationItem href="contact">Contact</NavigationItem>
    </ul>
  );
};

export default NavigationMenu;
