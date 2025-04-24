import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OfferRatings = () => {
  const { offerId } = useParams();
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await axios.get(`/rating/getallratingsofoffer/${offerId}`);
        setRatings(res.data.data); 
      } catch (err) {
        console.error("Failed to fetch ratings", err);
      }
    };
    fetchRatings();
  }, [offerId]);

  return (
    <div>
      <h2 style={{textAlign:"center"}}>Ratings for offer</h2>
      <hr />
      {ratings.length === 0 ? (
        <p>No ratings yet.</p>
      ) : (
        ratings.map((item, index) => (
          <div key={index} style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}>
            <p><strong>Offer:</strong> {item.offerId.offer}</p>
            <p><strong>Rating:</strong> ⭐ {item.rating}</p>
            <p><strong>Review:</strong> {item.review}</p>
            <p><strong>By User:</strong> {item.userId?.firstName}&nbsp;{item.userId?.lastName}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default OfferRatings;
