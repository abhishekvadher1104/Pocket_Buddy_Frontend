import React from "react";
import styles from "../../styles/restaurantCss/restrocard.module.css";

const RestroCard = ({ photo, Restaurant, Area, City, offer,Description }) => {
  return (
    <div className={styles.card}>
      <img src={photo} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{Restaurant}</h2>
        <p className={styles.cardLocation}>
          📍 {Area && City ? `${Area}, ${City}` : "Location Not Available"}
        </p>

        {offer && <p className={styles.cardOffer}>🔥 {offer}</p>}
        <p className={styles.cardLocation}>ℹ️{Description}</p>
      </div>
    </div>
  );
};

export default RestroCard;
