import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import OfferCard from "./OfferCard";
import Loader from "../layouts/Loader";
import styles from '../../styles/userCss/offercard.module.css'

const SeeOffers = () => {
  const [offers, setOffers] = useState([]);
  const [isLoad,setIsload] = useState(false)

  const fetchOffer = async () => {
    setIsload(true)
    try {
      const res = await axios.get("/offer/getalloffers");
      console.log("API Response:", res.data.data);
      setOffers(res.data.data);
    } catch (error) {
      console.log(error);
    }
    finally{
      setIsload(false)
    }
  };

  useEffect(() => {
    fetchOffer();
  }, []);
  return (
    <div>
      <div className={styles.outerDiv}>
      <div>{isLoad && <Loader/>}</div>
      <h1>See Offers</h1>
      <ul>
        {offers?.length > 0 ? (
          offers.map((offer) => (
            <OfferCard key={offer?._id} offer={offer} />
          ))
        ) : (
          <p>No offers available</p>
        )}
      </ul>

      </div>
    </div>
  );
};
<Outlet></Outlet>

export default SeeOffers;
