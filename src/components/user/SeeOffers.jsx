import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const SeeOffers = () => {
  const [offers, setOffers] = useState([]);

  const fetchOffer = async () => {
    try {
      const res = await axios.get("/offer/getalloffers");
      console.log("API Response:", res.data.data);
      setOffers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOffer();
  }, []);
  return (
    <div>
      <h1>See Offers</h1>
      <ul>
        {offers?.length > 0 ? (
          offers.map((offer) => (
            <li key={offer?._id}>
              <h1>{offer?.restroName || "No Name Available"}</h1>
              <Link to={`/user/restaurantdetails/${offer._id}`}>
                See more
              </Link>
              {console.log("navigating to: ", offer._id)}
            </li>
          ))
        ) : (
          <p>No offers available</p>
        )}
      </ul>
    </div>
  );
};
<Outlet></Outlet>

export default SeeOffers;
