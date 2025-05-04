import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "../../styles/userCss/RestrofullDetails.module.css";
import Loader from "../layouts/Loader";
import { StarRating } from "react-flexible-star-rating";
import { useForm, Controller } from "react-hook-form";
import MyCountDown from "../common/MyCountDown";

const RestroFullDetails = () => {
  const { id } = useParams();
  const [restro, setRestro] = useState(null);
  const [offers, setOffers] = useState(null);
  const userId = localStorage.getItem("id");

  const { control, register, handleSubmit } = useForm();

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
      await axios.post(`/rating/addrating`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Thanks for your precious response...")
    } catch (error) {
      toast.error("Failed to add ratings...");
    }
  };

  if (!restro || !offers) return <Loader />;
  const roundToHalf = (num) => Math.round(num * 2) / 2;

  return (
    <div className={styles.fullPage}>
      <div className={styles.gradientOverlay}>
        <div className={styles.innerContainer}>
          <div className={styles.leftPane}>
            <img
              src={offers?.imageURL}
              alt="Offer Banner"
              className={styles.offerImage}
            />
          </div>
          <div className={styles.rightPane}>
            <h1>{restro?.Restaurant}</h1>
            <h2>{offers?.offer}</h2>
            <p>{offers?.description}</p>
            <p>
              📍 {restro?.area}, {restro?.city}
            </p>
            <p>
              🗓️ {new Date(offers?.startDate).toLocaleDateString()} -{" "}
              {new Date(offers?.endDate).toLocaleDateString()}
            </p>

            <MyCountDown
              startDate={offers?.startDate}
              endDate={offers?.endDate}
            />

            <form
              onSubmit={handleSubmit(submitHandler)}
              className={styles.form}
            >
              <label>Rating</label>
              <Controller
                name="rating"
                control={control}
                rules={{ required: "Rating required" }}
                render={({ field }) => (
                  <StarRating
                    starsLength={5}
                    initialRating={field.value || 0}
                    onRatingChange={(rating) =>
                      field.onChange(roundToHalf(rating))
                    }
                    allowHalfIcon
                  />
                )}
              />

              <label>Review</label>
              <textarea {...register("review", { required: true })} />

              <button type="submit" className={styles.submitBtn}>
                Submit 
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestroFullDetails;
