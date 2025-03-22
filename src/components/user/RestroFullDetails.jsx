import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";

const RestroFullDetails = () => {
  const id = useParams().id;
  const [restro, setRestro] = useState(null);
  const [rating, setRating] = useState(0);
  const [isRated, setIsRated] = useState(false);

  const getRestroById = async () => {
    try {
      const res = await axios.get(`/offer/getofferbyid/${id}`);
      console.log(res.data.data);
      setRestro(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRestroById();
  }, [id]);

  const handleRating = async (star) => {
    if (isRated) return; //User already rated, do nothing

    const userId = localStorage.getItem("id");

    try {
      const Res=await axios
      .post("/rating/addrating", {
        userId,
        id,
        rating: star,
      },{
        headers:{
          "Content-Type":"application/json"
        }
      }
    )
      alert("Rating added successfully!");
      console.log(Res.data.data);
      
        setRating(star);
        setIsRated(true); 
    } catch {
      (err) => console.error("Error adding rating:", err);
    }
  };

  if (!restro) return <h2>Loading...</h2>;
  return (
    <div>
      <h2>{restro.restroName}</h2>
      <p>{restro.description}</p>

      <h3>Rate this Restaurant:</h3>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={30}
          style={{
            cursor: isRated ? "not-allowed" : "pointer",
            color: star <= rating ? "gold" : "gray",
          }}
          onClick={() => handleRating(star)}
        />
      ))}

      {isRated && <p>You have already rated this restaurant.</p>}
    </div>
  );
};

export default RestroFullDetails;
