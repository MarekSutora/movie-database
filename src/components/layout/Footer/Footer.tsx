import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      Created by:&nbsp;
      <a href="https://mareksutora.sk" className={styles.link}>
        Marek Šútora
      </a>
    </footer>
  );
};

export default Footer;
