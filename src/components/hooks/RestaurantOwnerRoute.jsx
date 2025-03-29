import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const RestaurantOwnerRoute = () => {
  const [isCompleted, setIsCompleted] = useState(null); // ✅ Default `null` for loading state
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const checkProfileData = async () => {
      if (!role || !userId) {
        setIsCompleted(false);
        return;
      }

      if (role === "restaurant_owner") {
        try {
          const res = await axios.get(`/user/${userId}`);
          console.log("API Response: ", res.data);

          const { firstName, lastName, area, city, bio, Restaurant, email } =
            res.data;
          setIsCompleted(
            !!(
              firstName &&
              lastName &&
              area &&
              city &&
              bio &&
              Restaurant &&
              email
            )
          );
        } catch (error) {
          console.error("API Error: ", error);
          setIsCompleted(false);
        }
      } else {
        setIsCompleted(true);
      }
    };

    checkProfileData();
  }, [role, userId]);

  if (isCompleted === null) return <p>Loading...</p>;

  return isCompleted ? <Outlet /> : <Navigate to="/profile" />;
};

export default RestaurantOwnerRoute;
