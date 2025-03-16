import React from "react";
import styles from "../../styles/navbar.module.css";
import logo from '../../assets/images/logo.png'
import {Link} from 'react-router-dom'
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
            <Link className={styles.link} to='/'>Home</Link>
            <Link className={styles.link} to='/about'>About Us</Link>
            <Link className={styles.link} to='/contact'>Contact</Link>
          </div>
        </div>
        <div className={styles.buttons}>
          <div className={styles.login}>
            <input type="submit" value="Login" />
          </div>
          <div className={styles.signup}>
            <input type="submit" value="Signup" />
          </div>
        </div>

       </div>
      </div>
    </div>
  );
};

export default Navbar;
