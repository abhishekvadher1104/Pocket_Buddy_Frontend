import React from "react";
import Navbar from "./Navbar";
import styles from "../../styles/homepage.module.css";
import Carousel from "./Carousel";
import salad from "../../assets/images/famous.gif";
import TopRestro from "./TopRestro";
import Footer from "../common/Footer";
const HomePage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className={styles.outer}>
        <section className={styles.part1}>
          <div className={styles.text1}>
            <div className={styles.img1}>
              <Carousel />
            </div>
            <div className={styles.part1text}>
              <h1>Craving something delicious? Let Pocket Buddy guide you!</h1>
              <p className={styles.para}>
                Welcome to <span className={styles.span}>P</span>
                <span>ocket</span>
                <span className={styles.span}>B</span>uddy. your ultimate
                companion for discovering the best restaurants around you.
                Whether you're craving local flavors or a fine dining
                experience, we bring the best options right to your fingertips.
                Enjoy delicious meals, exclusive offers, and a hassle-free
                dining journey with us!
              </p>
            </div>
          </div>
        </section>
        <section className={styles.part2}>
          <div className={styles.titleSection}>
            <p>Top Picks by Foodies</p>
            <img src={salad} alt="" />
          </div>
          <div className={styles.topRestro}>
            {/* <TopRestro/> */}
            top rated Restro will be showing soon...
          </div>
        </section>
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default HomePage;
