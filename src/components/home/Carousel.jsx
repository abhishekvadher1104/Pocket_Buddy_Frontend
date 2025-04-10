import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import styles from "../../styles/homepage.module.css";
import offer1 from "../../assets/images/food.gif";
import food2 from "../../assets/images/food2.webp";
import food3 from "../../assets/images/food3.jpg";
import img4 from "../../assets/images/restaurantImg.jpg";

const Carousel = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      autoplay={{ delay: 7000 }}
      pagination={{ clickable: true }}
      loop={true}
      className={styles.carousel}
    >
      <SwiperSlide className={styles.slide}>
        <img src={offer1} alt="offer" className={styles.carouselImg1} />
        <div className={styles.textOverlay}>Delicious Deals Await – Grab Yours Now! 🍕💰</div>
      </SwiperSlide>
      {/* <SwiperSlide className={styles.slide}>
        <img src={food2} alt="Dish 1" className={styles.carouselImg} />
        <div className={styles.textOverlay}>
          Find the Best Restaurant Near You!!
        </div>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <img src={food3} alt="Dish 2" className={styles.carouselImg} />
        <div className={styles.textOverlay}></div>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <img src={img4} alt="Restaurant" className={styles.carouselImg} />
        <div className={styles.textOverlay}></div>
      </SwiperSlide> */}
    </Swiper>
  );
};

export default Carousel;
