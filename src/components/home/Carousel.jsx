import React from "react";
import styles from "../../styles/carousel.module.css";

const Carousel = () => {
  return (
    <section className={styles.imageGridSection}>


      <div className={styles.parent}>
        <div className={styles.div1}></div>
        <div className={styles.div2}></div>
        <div className={styles.div3}></div>
        <div className={styles.div4}></div>
      </div>
    </section>
  );
};

export default Carousel;
