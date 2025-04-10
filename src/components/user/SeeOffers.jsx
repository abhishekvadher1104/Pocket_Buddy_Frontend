import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import OfferCard from "./OfferCard";
import Loader from "../layouts/Loader";
import styles from "../../styles/userCss/offercard.module.css";
import MyCountDown from "../common/MyCountDown";

const SeeOffers = () => {
  const [offers, setOffers] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [restaurant, setRestaurant] = useState([]);

  const fetchOffer = async () => {
    setIsLoad(true);
    try {
      const res = await axios.get("/offer/getalloffers");
      const response = await axios.get("/users/restaurantname");

      setOffers(res.data.data); //all offers
      console.log("API Response:", res.data.data);

      setRestaurant(response.data.data); // Restaurant details name,area, city
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    fetchOffer();
  }, []);
  const mergedOffers = offers.map((offer) => {
    const matchedRestaurant = restaurant.find(
      (restro) => String(restro._id) === String(offer.userId) //restaurant details wadi id  means usermodel ma save chhe etle id and offers na table ma user ni reference ni id etle userId metch thay te rite be reponses ne merge karo and then map karo
    );
    console.log("metched: ", matchedRestaurant);

    return {
      ...offer,
      restroName: matchedRestaurant ? matchedRestaurant.Restaurant : "Unknown",
      area: matchedRestaurant ? matchedRestaurant.area : "Unknown",
      city: matchedRestaurant ? matchedRestaurant.city : "unavailable",
    };
  });

  return (
    <div>
      {isLoad && <Loader />}
      <div className={styles.cardContainer}>
        {mergedOffers.map((offer) => (
          <>
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
          </>
        ))}
      </div>
    </div>
  );
};

export default SeeOffers;
