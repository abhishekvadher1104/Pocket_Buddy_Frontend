import React from "react";
import styles from "../../styles/restaurantCss/restrocard.module.css";

const RestroCard = ({
  photo,
  restroName,
  areaName,
  cityName,
  stateName,
  offer,
}) => {
  return (
    <div className={styles.card}>
      <img src={photo} alt={restroName} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{restroName}</h2>
        <p className={styles.cardLocation}>
        📍{areaName}, {cityName}, {stateName}
        </p>
        {offer && <p className={styles.cardOffer}>🔥 {offer}</p>}
      </div>
    </div>
  );
};

export default RestroCard;
