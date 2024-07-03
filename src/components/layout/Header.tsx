import { NavLink } from "react-router-dom";
import styles from "./css/Header.module.scss";
import { pagesLinks } from "../../lib/shared/constants";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Movie Database</h1>
      <nav className={styles.nav}>
        {pagesLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              isActive ? styles.activeNavLink : styles.navLink
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
