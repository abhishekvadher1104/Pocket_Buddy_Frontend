import { Link } from "react-router-dom";
import styles from "../../styles/userCss/offercard.module.css";
import MyCountDown from "../common/MyCountDown";

const OfferCard = ({ photo, Restaurant, Area, City, offer, id , startDate,endDate}) => {
  return (
    <div className={styles.card}>
      <img
        src={photo || "no img available"}
        alt={Restaurant}
        className={styles.image}
      />
      <div className={styles.cardContent}>
        <h2 className={styles.title}>{Restaurant}</h2>
        <p className={styles.offerText}>🔥{offer || "No Offer Available"}</p>
        <p className={styles.cardLocation}>
          📍 {Area && City ? `${Area}, ${City}` : "Location Not Available"}
        </p>
        <span> 
        <MyCountDown startDate={startDate} endDate={endDate}/>
        </span>
        <Link
          to={`/user/restaurantdetails/${id}`}
          className={styles.link}
        >
          See More
        </Link>
      </div>
    </div>
  );
};

export default OfferCard;
