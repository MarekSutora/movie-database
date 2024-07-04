import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      Created by:&nbsp;
      <a
        href="https://www.linkedin.com/in/marek-%C5%A1%C3%BAtora-9867b4269/"
        className={styles.link}
      >
        Marek Šútora
      </a>
    </footer>
  );
};

export default Footer;
