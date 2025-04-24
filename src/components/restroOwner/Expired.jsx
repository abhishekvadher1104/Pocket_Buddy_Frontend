import React, { useEffect, useState } from "react";
import axios from "axios";
import { div } from "framer-motion/client";

const Expired = () => {
  const [allOffers, setAllOffers] = useState([]);
  const [expiredOffers, setExpiredOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get(
          `/offer/getofferbyuserid/${localStorage.getItem("id")}`
        );
        const offers = res.data.data;

        const today = new Date();

        const expired = offers.filter(
          (offer) => new Date(offer.endDate) < today
        );

        setAllOffers(offers);
        setExpiredOffers(expired);
      } catch (err) {
        console.error("Failed to fetch offers", err);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>❌ Expired Offers</h2>
      <hr />
      {expiredOffers.length === 0 ? (
        <p>No expired offers</p>
      ) : (
        expiredOffers.map((offer, index) => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              key={index}
              style={{
                width: "500px",
                border: "1px solid red",
                padding: "10px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img
                style={{ height: "200px", width: "200px" }}
                src={offer.imageURL}
                alt=""
              />
              <h3 style={{ color: "red" }}>❌ {offer.offer}</h3>
              <p>{offer.description}</p>
              <p>
                <strong>Ended:</strong>{" "}
                {new Date(offer.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Expired;
