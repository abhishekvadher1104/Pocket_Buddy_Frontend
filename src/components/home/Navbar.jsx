import React from "react";
import styles from "../../styles/navbar.module.css";
import logo from "../../assets/images/logo.png";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <div className={styles.nav}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
        </div>
        <div className={styles.right_nav}>
          <div className={styles.navbar}>
            <div className={styles.nav_items}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.activeLink}`
                    : styles.navLink
                }
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.activeLink}`
                    : styles.navLink
                }
                to="/about"
              >
                About Us
              </NavLink>
            </div>
          </div>
          <div className={styles.buttons}>
            <div className={styles.login}>
              <NavLink to={"/login"}>
                {" "}
                <input type="submit" value="Login" />
              </NavLink>
            </div>
            <div className={styles.signup}>
              <NavLink to={"/signup"}>
                <input type="submit" value="Signup" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
