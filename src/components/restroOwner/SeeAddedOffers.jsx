import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../layouts/Loader";
import RestroCard from "./RestroCard";
import styles from "../../styles/restaurantCss/restrocard.module.css";

const SeeAddedOffers = () => {
  const [offers, setOffers] = useState([]);
  const [isload, setIsload] = useState(false);
  const [restaurant, setRestaurant] = useState([]);

  const getAllMyOffers = async () => {
    setIsload(true);
    try {
      const res = await axios.get(
        `/offer/getofferbyuserid/${localStorage.getItem("id")}`
      );
      
      const response = await axios.get("/users/restaurantname");
      setRestaurant(response.data.data);
      setOffers(res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsload(false);
    }
  };

  useEffect(() => {
    console.log("User ID:", localStorage.getItem("id"));
    getAllMyOffers();
  }, []);

  const mergedOffers = offers.map((offer) => {
    const matchedRestaurant = restaurant.find(
      (restro) => String(restro._id) === String(offer.userId)
    );

    return {
      ...offer,
      restroName: matchedRestaurant ? matchedRestaurant.Restaurant : "Unknown",
      area: matchedRestaurant ? matchedRestaurant.area : "Unknown", 
      city: matchedRestaurant ? matchedRestaurant.city : "unavailable",
      Description: matchedRestaurant
        ? matchedRestaurant.description
        : "desc not available",
    };
  });

  return (
    <div>
      {isload && <Loader />}
      <div className={styles.cardContainer}>
        {mergedOffers.map((offer) => (
          <RestroCard
            key={offer._id}
            photo={offer.imageURL}
            Restaurant={offer.restroName}
            City={offer.city}
            Area={offer.area}
            offer={offer.offer}
            Description={offer.description}
          />
        ))}
      </div>
    </div>
  );
};

export default SeeAddedOffers;
