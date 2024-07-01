import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { pagesLinks } from "../../lib/shared/constants";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Movie Database</h1>
      <nav className={styles.nav}>
        {pagesLinks.map((link) => (
          <div className={styles.navlinkContainer}>
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive ? styles.activeNavLink : styles.navLink
              }
            >
              {link.name}
            </NavLink>
          </div>
        ))}
      </nav>
    </header>
  );
};

export default Header;
