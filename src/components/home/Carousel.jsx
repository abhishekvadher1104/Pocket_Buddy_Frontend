import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import styles from "../../styles/homepage.module.css";
import offer1 from "../../assets/images/offer1.jpg";
import food2 from "../../assets/images/food2.webp";

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
      <SwiperSlide>
        <img src={offer1} alt="offer" className={styles.carouselImg} />
      </SwiperSlide>
      <SwiperSlide>
        <img src={food2} alt="Dish 1" className={styles.carouselImg} />
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
