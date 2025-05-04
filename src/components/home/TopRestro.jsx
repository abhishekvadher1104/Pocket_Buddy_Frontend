import axios from "axios";
import React, { useEffect, useState } from "react";
import TopOfferCard from "../common/TopOfferCard";

const TopRestro = () => {
  const [offer, setOffer] = useState([]);

  const topOffers = async () => {
    try {
      const res = await axios.get("/rating/toprestro");
      console.log(res.data);
      const filteredOffers= res.data.data[0].offers.filter((offerData)=>{
        const currDate = new Date();
        const endDate = new Date(offerData?.offerId?.endDate)
        return endDate > currDate;
      });  
      setOffer(filteredOffers)
    } catch (err) {
      console.error("Failed to fetch top offers:", err);
    }
  };

  useEffect(() => {
    topOffers();
  }, []);

  return (
    <div className="p-6 overflow-x-auto">
      <div className="flex gap-4 whitespace-nowrap">
        {offer.map((offerData) => (
          <TopOfferCard
            key={offerData._id}
            offerData={offerData}  // Passing the whole offer data object
          />
        ))}
      </div>
    </div>
  );
};

export default TopRestro;
