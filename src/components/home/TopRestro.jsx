import axios from 'axios'
import React, { useState } from 'react'
import {FaStar} from 'react-icons/fa'

const TopRestro = () => {
  const ratingsArray = [1,2,3,4,5]
  console.log(ratingsArray);
  
  const [rating,setRating] = useState(0)
  const handleRatings = (star) =>{
    setRating(star)
  }

  return (
    <div>
      <h2>Rate Restaurant</h2>
     {
      ratingsArray.map((star)=>{
        console.log("rating star");
        return(
          <FaStar
          key={star}
          style={{
            fontSize: "50px",
            cursor: "pointer",
            color: star <= rating ? "gold" : "gray",
            marginRight: "5px",
          }}
          onClick={() => handleRatings(star)}
          />
        )
      })

     }

   
      
    </div>
  )
}

export default TopRestro
