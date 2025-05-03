import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import defaultPic from "../../assets/images/restaurant.png";
import axios from "axios";
import styles from "../../styles/userCss/profile.module.css";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../layouts/Loader"; 
const Owner_Profile = () => {
  const userId = localStorage.getItem("id");
  const [profilePic, setProfilePic] = useState(defaultPic);
  const [loading, setLoading] = useState(true); // Track loading state
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      city: "",
      bio: "",
      area: "",
      Restaurant: "",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/user/${userId}`);
        if (!response.data) {
          toast.warn('Please complete your profile');
        } else {
          if (response.data && response.data.data) {
            const userData = response.data.data;
            reset({
              email: userData.email || "",
              firstName: userData.firstName || "",
              lastName: userData.lastName || "",
              city: userData.city || "",
              Restaurant: userData.Restaurant || "",
              bio: userData.bio || "",
              area: userData.area || "",
            });

            if (userData.profilePic) {
              setProfilePic(userData.profilePic);
            }
          }
        }
      } catch (error) {
        console.log("Error fetching profile:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };
    if (userId) {
      fetchProfile();
    }
  }, [userId, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("Restaurant", data.Restaurant);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("area", data.area);
      formData.append("city", data.city);
      formData.append("bio", data.bio);

      if (data.profilePic && data.profilePic[0]) {
        formData.append("profilePic", data.profilePic[0]);
        setProfilePic(URL.createObjectURL(data.profilePic[0]));
      }
      await axios.put(`/user/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.log("error updating profile", error);
      toast.error("Failed to update profile...");
    }
  };

  if (loading) {
    return <Loader />; // Show the loader while loading
  }

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.title}>Edit Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className={styles.profilePicContainer}>
          <img src={profilePic} alt="Profile" className={styles.profilePic} />
          <input
            type="file"
            {...register("profilePic")}
            className={styles.fileInput}
            accept="image/*"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            {...register("email")}
            className={styles.input}
            readOnly
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="Restro">Restaurant Name:</label>
          <input
            type="text"
            {...register("Restaurant", {
              required: "Restaurant Name is required",
            })}
            className={styles.input}
          />
          {errors.Restaurant && (
            <p className={styles.error}>{errors.Restaurant.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>First Name</label>
          <input
            type="text"
            {...register("firstName", { required: "First name is required" })}
            className={styles.input}
          />
          {errors.firstName && (
            <p className={styles.error}>{errors.firstName.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Last Name</label>
          <input
            type="text"
            {...register("lastName", { required: "Last name is required" })}
            className={styles.input}
          />
          {errors.lastName && (
            <p className={styles.error}>{errors.lastName.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="area">Area</label>
          <input
            type="text"
            {...register("area", { required: "Area is required" })}
            className={styles.input}
          />
        </div>
        {errors.area && <p className={styles.error}>{errors.area.message}</p>}
        <div className={styles.formGroup}>
          <label>City</label>
          <input type="text" {...register("city")} className={styles.input} />
        </div>
        {errors.city && <p className={styles.error}>{errors.city.message}</p>}

        <div className={styles.formGroup}>
          <label>Bio</label>
          <textarea
            {...register("bio")}
            className={styles.textarea}
            rows="3"
          ></textarea>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Owner_Profile;
