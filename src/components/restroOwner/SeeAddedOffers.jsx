import { useEffect, useState } from "react";
import axios from "axios";
import Loader from '../layouts/Loader'
import RestroCard from "./RestroCard";
import styles from "../../styles/restaurantCss/restrocard.module.css"
const SeeAddedOffers = () => {
  const [offers, setOffers] = useState([]);
  const [isload, setIsload] = useState(false);

  const getAllMyOffers = async () => {
    setIsload(true);
    const res = await axios.get(
      "/offer/getofferbyuserid/" + localStorage.getItem("id")
    );
    console.log(res.data);
    setOffers(res.data.data);
    setIsload(false);
  };
  useEffect(() => {
    console.log(localStorage.getItem("id"));

    getAllMyOffers();
  }, []);
  return (
    <div>
      <div>{isload && <Loader />}</div>
      <div className={styles.cardContainer}>
        {offers?.map((offer) => (
          <div>
            {
              <RestroCard 
              photo={offer.imageURL}
              restroName={offer.restroName}
              areaName={offer.areaId.name}
              cityName={offer.cityId.name}
              stateName={offer.stateId.name}
              offer = {offer.offer}
              />
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeeAddedOffers;
