import axios from "axios";
import React, { useEffect, useState } from "react";
import OfferCard from "./OfferCard";
import Loader from "../layouts/Loader";
import styles from "../../styles/userCss/offercard.module.css";

const SeeOffers = () => {
  const [offers, setOffers] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [searchText, setSearchText] = useState("");

  const userId = localStorage.getItem("id");

  const fetchOffer = async () => {
    setIsLoad(true);
    try {
      const res = await axios.get("/offer/getalloffers");
      const response = await axios.get("/users/restaurantname");

      setOffers(res.data.data);
      setRestaurant(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    fetchOffer();
  }, []);

  const mergedOffers = offers
    .map((offer) => {
      const matchedRestaurant = restaurant.find(
        (restro) => String(restro._id) === String(offer.userId)
      );
      return {
        ...offer,
        restroName: matchedRestaurant
          ? matchedRestaurant.Restaurant
          : "Unknown",
        area: matchedRestaurant ? matchedRestaurant.area : "Unknown",
        city: matchedRestaurant ? matchedRestaurant.city : "Unavailable",
      };
    })
    .filter((offer) => {
      const endDate = new Date(offer.endDate);
      const today = new Date();

      return endDate >= today;
    });

  const filteredOffers = mergedOffers.filter((offer) => {
    const search = searchText.toLowerCase();
    const formattedStartDate = new Date(offer.startDate).toLocaleDateString(
      "en-US"
    );
    const formattedEndDate = new Date(offer.endDate).toLocaleDateString(
      "en-US"
    );
    return (
      offer.restroName.toLowerCase().includes(search) ||
      offer.city.toLowerCase().includes(search) ||
      offer.area.toLowerCase().includes(search) ||
      offer.offer.toLowerCase().includes(search) ||
      offer.description.toLowerCase().includes(search) ||
      formattedStartDate.includes(search) ||
      formattedEndDate.includes(search)
    );
  });

  return (
    <div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="🔍 Search by name, date, food type..."
          className={styles.inputField}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {isLoad && <Loader />}

      <div className={styles.cardContainer}>
        {filteredOffers.length > 0 ? (
          filteredOffers.map((offer) => (
            <OfferCard
              key={offer._id}
              photo={offer.imageURL}
              Restaurant={offer.restroName}
              City={offer.city}
              Area={offer.area}
              offer={offer.offer}
              Description={offer.description}
              id={offer._id}
              startDate={offer.startDate}
              endDate={offer.endDate}
            />
          ))
        ) : (
          <p style={{ padding: "1rem", textAlign: "center" }}>
            No offers found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default SeeOffers;
