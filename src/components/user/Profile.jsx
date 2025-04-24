import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "../../styles/userCss/profile.module.css";
import defaultPic from "../../assets/images/default.png";
import { toast } from "react-toastify";
const ProfileForm = () => {
  const userId = localStorage.getItem("id");
  const [profilePic, setProfilePic] = useState(defaultPic);
  const [loading, setIsLoad] = useState(false);

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
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoad(true);
        const response = await axios.get(`/user/${userId}`);
        if (!response.data.data) {
          toast.warn("please complete profile");
        }
        if (response.data && response.data.data) {
          const userData = response.data.data;
          reset({
            email: userData.email || "",
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            city: userData.city || "",
            bio: userData.bio || "",
          });

          if (userData.profilePic) {
            setProfilePic(userData.profilePic);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
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
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

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
          <label>City</label>
          <input type="text" {...register("city")} className={styles.input} />
        </div>

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

export default ProfileForm;
