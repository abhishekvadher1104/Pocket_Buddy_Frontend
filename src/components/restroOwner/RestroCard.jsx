import React from "react";
import styles from "../../styles/restaurantCss/restrocard.module.css";
import MyCountDown from "../common/MyCountDown";
import { Link } from "react-router-dom";

const RestroCard = ({
  photo,
  Restaurant,
  startDate,
  endDate,
  offer,
  Description,
  offerId
}) => {
  return (
    <div className={styles.card}>
      <img src={photo} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{Restaurant}</h2>
        {offer && <p className={styles.cardOffer}>🔥 {offer}</p>}
        <p className={styles.cardLocation}>ℹ️{Description}</p>
        <div className={styles.MyCountDown}>
          <MyCountDown startDate={startDate} endDate={endDate} />
        </div>
        <Link to={`/restro_owner/ratings/${offerId}`}>
          <button className={styles.ratingsButton}>See Ratings</button>
        </Link>
      </div>  
    </div>
  );
};

export default RestroCard;
