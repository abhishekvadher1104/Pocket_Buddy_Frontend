import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import styles from "../../styles/homepage.module.css";
import offer1 from "../../assets/images/food.gif";

const Carousel = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
      className={styles.carousel}
    >
      <SwiperSlide className={styles.slide}>
        <img src={offer1} alt="offer" className={styles.carouselImg1} />
        <div className={styles.textOverlay}>Delicious Deals Await – Grab Yours Now! 🍕💰</div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
