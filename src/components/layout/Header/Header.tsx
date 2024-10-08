import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { pagesLinks } from "../../../lib/constants";

const Header = () => {
  return (
    <header className={styles.header}>
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
