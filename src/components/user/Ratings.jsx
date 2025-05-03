import React, { useState, useEffect } from "react";
import axios from "axios";

const Ratings = () => {
  const [ratings, setRatings] = useState([]);
  const id = localStorage.getItem("id");

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await axios.get(`/rating/getallratingofuser/${id}`);
        setRatings(res.data.data);
      } catch (error) {
        console.log('error',error);
      }
    };

    fetchRatings();
  }, []);

  return (
    <div className="p-4">
      <h1 >⭐Your Ratings</h1>
      {ratings.length === 0 ? (
        <p>No ratings found.</p>
      ) : (
        ratings.map((r) => (
          <div key={r._id} className="border p-4 mb-3 rounded shadow">
            <img
              src={r.offerId?.imageURL}
              alt="offer"
              className="w-32 h-32 object-cover rounded mb-2"
            />
            <h2 className="text-lg font-bold text-blue-600">
              Offer: {r.offerId?.offer}
            </h2>
            <p className="text-sm text-gray-700">
              Description: {r.offerId?.description}
            </p>
            <p>City: {r.userId?.city}</p>     
            <p>
              Rating:{" "}
              {[...Array(r.rating)].map((_, i) => (
                <span key={i}>⭐</span>
              ))}
            </p>
            <p>Review: {r.review}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Ratings;
