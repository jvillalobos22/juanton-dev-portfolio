import { ReactNode } from "react";
import Link from "next/link";
import styles from "./NavigationItem.module.scss";
import classNames from "classnames";

interface INavigationItemProps {
  href: string;
  children: ReactNode;
  element?: "li" | "div";
  className?: string;
}

const NavigationItem = ({
  href,
  children,
  className,
  element = "li",
}: INavigationItemProps) => {
  const linkElement: ReactNode = <Link href={href}>{children}</Link>;
  const classString = className
    ? classNames(className, styles.navigationItem)
    : styles.navigationItem;
  return element === "li" ? (
    <li className={classString}>{linkElement}</li>
  ) : (
    <div className={classString}>{linkElement}</div>
  );
};

export default NavigationItem;
