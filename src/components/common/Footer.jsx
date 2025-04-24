import React from 'react';
import styles from '../../styles/footer.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLeft}>
          <p>Discover amazing offers and deals at your favorite restaurants. Follow us to stay updated!</p>
        </div>

        <div className={styles.footerRight}>
          <a href="https://www.facebook.com/profile.php?id=100061056112903" target="_blank"><i className="fab fa-facebook"></i></a>
          <a href="https://github.com/abhishekvadher1104" target="_blank"><i className="fab fa-github"></i></a>
          <a href="https://www.linkedin.com/in/abhishek-vadher-524200266/" target="_blank"><i className="fab fa-linkedin"></i></a>
        </div>
      </div>

      <div className={styles.copyright}>
        <p>&copy; 2025 <span>POCKET BUDDY</span>. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
