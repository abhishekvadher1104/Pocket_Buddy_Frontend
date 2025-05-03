import { Link } from "react-router-dom";
import styles from "../../styles/userCss/offercard.module.css";
import MyCountDown from "../common/MyCountDown";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";

const OfferCard = ({
  photo,
  Restaurant,
  Area,
  City,
  offer,
  id,
  startDate,
  endDate,
}) => {
  const userId = localStorage.getItem("id");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  // 👉 Check wishlist status on mount
  useEffect(() => {
    const checkWishlistStatus = async () => {
      try {
        const res = await axios.get(`/wishlist/check/${userId}/${id}`);
        if (res.data.isWishlisted) {
          setIsWishlisted(true);
        }
      } catch (err) {
        console.error("Failed to check wishlist status", err);
      }
    };

    if (userId) {
      checkWishlistStatus();
    }
  }, [userId, id]);

  const handleWishlistToggle = async () => {
    try {
      setLoading(true);
      if (isWishlisted) {
        await axios.delete(`wishlist/removefromwishlist/${userId}/${id}`);
        setIsWishlisted(false);
      } else {
        await axios.post(`/wishlist/addtowishlist/${userId}/${id}`);
        setIsWishlisted(true);
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={photo || "no img available"}
          alt={Restaurant}
          className={styles.image}
        />
        <button
          onClick={handleWishlistToggle}
          className={styles.heartButton}
          disabled={loading}
        >
          {isWishlisted ? (
            <FaHeart color="red" size={24} />
          ) : (
            <FaRegHeart color="gray" size={24} />
          )}
        </button>
      </div>
      <div className={styles.cardContent}>
        <h2 className={styles.title}>{Restaurant}</h2>
        <p className={styles.offerText}>🔥{offer || "No Offer Available"}</p>
        <p className={styles.cardLocation}>
          {Area && City ? `📍${Area}, ${City}` : ""}
        </p>
        <span>
          <MyCountDown startDate={startDate} endDate={endDate} />
        </span>
        <div >
          <Link to={`/user/restaurantdetails/${id}` }
          className={styles.link} >See More</Link>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
