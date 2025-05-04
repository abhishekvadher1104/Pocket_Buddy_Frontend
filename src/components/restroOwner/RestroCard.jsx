import React from "react";
import styles from "../../styles/restaurantCss/restrocard.module.css";
import MyCountDown from "../common/MyCountDown";
import { Link } from "react-router-dom";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa"; // ✏️ and trash icon

const RestroCard = ({
  photo,
  Restaurant,
  startDate,
  endDate,
  offer,
  Description,
  offerId,
  handleDelete, // Pass the delete function as a prop
}) => {
  return (
    <div className={styles.card}>
      <img
        src={photo || "no img available"}
        className={styles.cardImage}
        alt={Restaurant}
      />
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{Restaurant}</h2>
        {offer && <p className={styles.cardOffer}>🔥 {offer}</p>}
        <p className={styles.cardLocation}>ℹ️ {Description}</p>
        <div className={styles.MyCountDown}>
          <MyCountDown startDate={startDate} endDate={endDate} />
        </div>
        <Link to={`/restro_owner/ratings/${offerId}`}>
          <button className={styles.ratingsButton}>See Ratings</button>
        </Link>
        <Link to={`/restro_owner/update-offer/${offerId}`}>
          <button className={styles.iconButton} title="Update Offer">
            <FaPencilAlt size={16} color="#555" />
          </button>
        </Link>
        {/* Delete Link */}
        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            handleDelete(offerId);
          }}
        >
          <button className={styles.iconButton} title="Delete Offer">
            <FaTrashAlt size={16} color="#555" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RestroCard;
