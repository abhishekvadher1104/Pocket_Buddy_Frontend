import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../layouts/Loader";
import RestroCard from "./RestroCard";
import styles from "../../styles/restaurantCss/restrocard.module.css";
import Swal from "sweetalert2";

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
      const today = new Date();
      const allOffers = res.data.data;
      const filteredOffers = allOffers.filter(
        (offer) => new Date(offer.endDate) >= today
      );

      const response = await axios.get("/users/restaurantname");
      setRestaurant(response.data.data);
      setOffers(filteredOffers);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsload(false);
    }
  };
  const handleDelete = (offerId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/offer/deleteoffer/${offerId}`);
          Swal.fire('Deleted!', 'Your offer has been deleted.', 'success');
        } catch (err) {
          Swal.fire('Error!', 'Failed to delete the offer.', 'error');
        }
      }
    });
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
      {isload ? (
        <Loader />
      ) : (
        <div>
          <h1>My Offers</h1>
          <div className={styles.cardContainer}>
            {mergedOffers.map((offer) => (
              <RestroCard
                key={offer._id}
                photo={offer.imageURL}
                Restaurant={offer.restroName}
                startDate={offer.startDate}
                endDate={offer.endDate}
                offer={offer.offer}
                Description={offer.description}
                offerId={offer._id}
                handleDelete={handleDelete} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeeAddedOffers;
