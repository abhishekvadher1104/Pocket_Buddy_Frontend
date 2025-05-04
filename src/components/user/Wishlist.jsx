import axios from "axios";
import React, { useEffect, useState } from "react";
import OfferCard from "./OfferCard";
import Loader from "../layouts/Loader";
import styles from "../../styles/userCss/offercard.module.css";
const WishList = () => {
  const [offers, setOffers] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  const userId = localStorage.getItem("id");

  const fetchWishlist = async () => {
    setIsLoad(true);
    try {
      const res = await axios.get(`/wishlist/getwishlist/${userId}`);
      console.log(res.data.data);

      const validOffers = res.data.data.filter((item) => {
        if (!item.offerId) return false; // Skip elements where offerId is null
        const endDate = new Date(item.offerId.endDate);
        const today = new Date();
        return endDate >= today;
      });

      setOffers(validOffers);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div >
      {isLoad && <Loader />}
      <h1>Your WishList</h1>
      <div className={styles.cardContainer}>
        {offers.length > 0 ? (
          offers.map((item) => {
            const offer = item.offerId;
            const restaurant = offer.userId;

            return (
              <OfferCard
                key={offer._id}
                photo={offer.imageURL}
                Restaurant={restaurant?.Restaurant || ""}
                City={restaurant?.city || ""}
                Area={restaurant?.area || ""}
                offer={offer.offer}
                Description={offer.description}
                id={offer._id}
                startDate={offer.startDate}
                endDate={offer.endDate}
              />
            );
          })
        ) : (
          <p style={{ padding: "1rem", textAlign: "center" }}>
            No offers found in your wishlist.
          </p>
        )}
      </div>
    </div>
  );
};

export default WishList;
