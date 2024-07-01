import Footer from "./Footer";
import Header from "./Header";
import styles from "./Layout.module.scss";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.div}>
      <Header />
      <main className={styles.main}> {children} </main>
      <Footer />
    </div>
  );
};

export default Layout;
