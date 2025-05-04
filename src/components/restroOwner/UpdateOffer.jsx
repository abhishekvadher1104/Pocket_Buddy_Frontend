import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "../../styles/restaurantCss/update.module.css";
import { toast } from "react-toastify";

const UpdateOffer = () => {
  const { offerId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      offer: "",
      description: "",
      startDate: "",
      endDate: "",
      foodType: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!offerId) {
      setError("Invalid offer ID");
      return;
    }
    const fetchOffer = async () => {
      try {
        const response = await axios.get(`/offer/getofferbyid/${offerId}`);
        const data = response.data.data;
        if (!data) {
          setError("No offer data found");
          return;
        }
        reset({
          offer: data.offer,
          description: data.description,
          startDate: data.startDate ? data.startDate.slice(0, 10) : "",
          endDate: data.endDate ? data.endDate.slice(0, 10) : "",
          foodType: data.foodType,
        });
      } catch (err) {
        console.error("Error fetching offer:", err);
        setError(err.response?.data?.message || "Failed to load offer data");
      }
    };

    fetchOffer();
  }, [offerId, reset]);

  const onSubmit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      if (formData.image && formData.image[0]) {
        // Case: Image is selected -> Use FormData
        const form = new FormData();
        form.append("offer", formData.offer);
        form.append("description", formData.description);
        form.append("startDate", formData.startDate);
        form.append("endDate", formData.endDate);
        form.append("foodType", formData.foodType);
        form.append("image", formData.image[0]);

        for (let [key, value] of form.entries()) {
          console.log(`${key}:`, value);
        }

        await axios.put(`/offer/updateoffer/${offerId}`, form);
      } else {
        // Case: No image -> Send JSON
        const payload = {
          offer: formData.offer,
          description: formData.description,
          startDate: formData.startDate,
          endDate: formData.endDate,
          foodType: formData.foodType,
        };

        console.log("JSON payload:", payload);

        await axios.put(`/offer/updateoffer/${offerId}`, payload);
      }

      toast.success("Offer updated successfully!");
      navigate("/restro_owner/seeoffers");
    } catch (err) {
      console.error("Error updating offer:", err);
      setError(err.response?.data?.message || "Failed to update offer");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className={styles.errorMessage}>
        Error: {error}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Update Offer</h1>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className={styles.formGroup}>
          <label className={styles.label}>Offer:</label>
          <input
            type="text"
            className={`${styles.formControl} ${errors.offer ? styles.invalid : ""}`}
            {...register("offer", { required: "Offer is required" })}
          />
          {errors.offer && (
            <div className={styles.invalidFeedback}>{errors.offer.message}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Description:</label>
          <textarea
            className={`${styles.formControl} ${errors.description ? styles.invalid : ""}`}
            {...register("description", { required: "Description is required" })}
          />
          {errors.description && (
            <div className={styles.invalidFeedback}>{errors.description.message}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Start Date:</label>
          <input
            type="date"
            className={`${styles.formControl} ${errors.startDate ? styles.invalid : ""}`}
            {...register("startDate", { required: "Start date is required" })}
          />
          {errors.startDate && (
            <div className={styles.invalidFeedback}>{errors.startDate.message}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>End Date:</label>
          <input
            type="date"
            className={`${styles.formControl} ${errors.endDate ? styles.invalid : ""}`}
            {...register("endDate", { required: "End date is required" })}
          />
          {errors.endDate && (
            <div className={styles.invalidFeedback}>{errors.endDate.message}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Food Type:</label>
          <select
            className={`${styles.formControl} ${errors.foodType ? styles.invalid : ""}`}
            {...register("foodType", { required: "Food type is required" })}
          >
            <option value="">Select</option>
            <option value="gujarati">Gujarati</option>
            <option value="punjabi">Punjabi</option>
            <option value="chinese">Chinese</option>
            <option value="southindian">South Indian</option>
            <option value="pavbhaji">Pav Bhaji</option>
            <option value="italian">Italian</option>
          </select>
          {errors.foodType && (
            <div className={styles.invalidFeedback}>{errors.foodType.message}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Image (optional):</label>
          <input
            type="file"
            className={styles.formControl}
            {...register("image")}
            accept="image/*"
          />
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="submit"
            className={`${styles.btn} ${styles.btnPrimary}`}
            disabled={isSubmitting || loading}
          >
            {loading ? "Updating..." : "Update Offer"}
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={() => navigate("/restro_owner/seeoffers")}
          >
            See Added Offers
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOffer;