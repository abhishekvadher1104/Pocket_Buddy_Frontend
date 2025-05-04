import React from "react";
import { FaStar } from "react-icons/fa";
import styles from "../../styles/TopOfferCard.module.css";

const TopOfferCard = ({ offerData }) => {
  const { offerId, rating, userId } = offerData;

  return (
    <div className={styles.card}>
      <img
        src={offerId.imageURL}
        loading="lazy"
        alt={offerId?.offer}
        className={styles.cardImg}
      />
      <div className={styles.cardContent}>
        <p className={styles.foodType}>{offerId?.foodType}</p>
        <h3 className={styles.cardTitle}>{offerId?.offer}</h3>
        <p className={styles.cardRestaurant}>{userId?.Restaurant}</p>
        <div className={styles.rating}>
          <FaStar className={styles.starIcon} />
          <span className={styles.ratingValue}>{rating?.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default TopOfferCard;
