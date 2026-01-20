import styles from "./SiteFooter.module.scss";

const SiteFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <span className={styles.footerLogo}>JV</span>
        <span className={styles.footerCopy}>
          © {new Date().getFullYear()} Juan Villalobos
        </span>
      </div>
    </footer>
  );
};

export default SiteFooter;
