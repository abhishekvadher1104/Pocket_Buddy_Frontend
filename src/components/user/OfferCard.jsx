import { Link } from "react-router-dom";
import styles from "../../styles/userCss/offercard.module.css"; // Make sure to create & style this file

const OfferCard = ({ offer }) => {
  return (
    <div className={styles.card}>
      <img
        src={offer?.imageURL || "/default-restaurant.jpg"} // Provide default image if none available
        alt={offer?.restroName || "Restaurant Image"}
        className={styles.image}
      />
      <div className={styles.cardContent}>
        <h2 className={styles.title}>{offer?.restroName || "No Name Available"}</h2>
        <p className={styles.offerText}>{offer?.offer || "No Offer Available"}</p>
        <Link to={`/user/restaurantdetails/${offer._id}`} className={styles.link}>
          See More
        </Link>
      </div>
    </div>
  );
};

export default OfferCard;
