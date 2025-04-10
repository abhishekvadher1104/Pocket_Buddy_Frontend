import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "../../styles/userCss/RestrofullDetails.module.css";
import Loader from "../layouts/Loader";
import { StarRating } from "react-flexible-star-rating";
import { useForm, Controller } from "react-hook-form";

const RestroFullDetails = () => {
  const { id } = useParams();
  const [restro, setRestro] = useState(null);
  const [offers, setOffers] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const userId = localStorage.getItem("id");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchRestro = async () => {
    try {
      const response = await axios.get(`/offer/getofferbyid/${id}`);
      setOffers(response.data.data);
      setRestro(response.data.data.userId);
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
    }
  };

  useEffect(() => {
    fetchRestro();
  }, [id]);

  const submitHandler = async (data) => {
    try {
      const payload = { ...data, id, userId };
      await axios.post(`/rating/addrating`, payload,{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsSubmitted(true);
    } catch (error) {
      toast.error("Failed to add ratings...");
    }
  };

  if (!restro || !offers) return <Loader />;

  return (
    <div>
      <h1>Overview</h1>
      <div>
        <h2 className={styles.name}>{restro?.Restaurant}</h2>
        <h3 className={styles.offer}>Offer: {offers?.offer}</h3>
        <div className={styles.description}>
          <p>Description: {offers?.description}</p>
        </div>
        <div className={styles.date}>
          <p>Start Date: {new Date(offers?.startDate).toLocaleDateString()}</p>
        </div>
        <p>End Date: {new Date(offers?.endDate).toLocaleDateString()}</p>
        <p>Area: {restro?.area}</p>
        <p>City: {restro?.city}</p>
      </div>

      {isSubmitted ? (
        <div>
          <h3>Your Rating:</h3>
          <StarRating
            starsLength={5}
            initialRating={parseFloat(isSubmitted.ratings)}
            isHalfRatingEnabled={false}
            isReadOnly={true}
            dimension={30}
            color="#FFD700"
          />
          <h3>Your Review:</h3>
          <p>{isSubmitted.review}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(submitHandler)}>
          <div>
            <label>Rating:</label>
            <Controller
              name="ratings"
              control={control}
              rules={{ required: "Please select a rating." }}
              render={({ field }) => (
                <StarRating
                  starsLength={5}
                  initialRating={field.value || 0}
                  isHalfRatingEnabled={false}
                  isHoverEnabled={true}
                  isReadOnly={false}
                  dimension={30}
                  color="#FFD700"
                  onRatingChange={field.onChange}
                />
              )}
            />
            {errors.rating && <p>{errors.rating.message}</p>}
          </div>
          <div>
            <label>Review:</label>
            <textarea
              {...register("review", { required: "Please enter your review." })}
              rows="4"
              cols="50"
              placeholder="Write your review here..."
            />
            {errors.review && <p>{errors.review.message}</p>}
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default RestroFullDetails;
