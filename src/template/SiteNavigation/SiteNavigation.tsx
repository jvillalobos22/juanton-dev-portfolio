"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./SiteNavigation.module.scss";

const navItems = [
  { href: "/projects", label: "Projects", num: "01" },
  { href: "/blog", label: "Blog", num: "02" },
  { href: "/about", label: "About", num: "03" },
];

const SiteNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      >
        <nav className={styles.nav}>
          {/* Logo / Brand */}
          <Link href="/" className={styles.logo}>
            <span className={styles.logoMark}>JV</span>
            <span className={styles.logoText}>
              <span className={styles.logoName}>Juan Villalobos</span>
              <span className={styles.logoRole}>Engineering Lead</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.href} className={styles.navItem}>
                <Link href={item.href} className={styles.navLink}>
                  <span className={styles.navNum}>{item.num}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <Link href="mailto:juan@juanvillalobos.me" className={styles.cta}>
            <span>Let&apos;s Talk</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className={`${styles.menuToggle} ${isMobileMenuOpen ? styles.open : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={styles.menuBar}></span>
            <span className={styles.menuBar}></span>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ""}`}
      >
        <div className={styles.mobileMenuContent}>
          <div className={styles.mobileMenuHeader}>
            <span className={styles.label}>Navigation</span>
          </div>
          <ul className={styles.mobileNavList}>
            {navItems.map((item, index) => (
              <li
                key={item.href}
                className={styles.mobileNavItem}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link
                  href={item.href}
                  className={styles.mobileNavLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className={styles.mobileNavNum}>{item.num}</span>
                  <span className={styles.mobileNavLabel}>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.mobileMenuFooter}>
            <Link
              href="mailto:juan@juanvillalobos.me"
              className={styles.mobileCta}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Let&apos;s Talk
            </Link>
            <div className={styles.mobileCoords}>
              <span className={styles.label}>Location</span>
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteNavigation;
