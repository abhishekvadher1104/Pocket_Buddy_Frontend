import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddOffer = () => {
  const { register, handleSubmit } = useForm();
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);

  const submitHandler = async (data) => {
    data.userId = localStorage.getItem("id");
    console.log("Form Data:", data);

    try {
      const formData = new FormData();
      formData.append("offer", data.offer);
      formData.append("description", data.description);
      formData.append("startDate", data.startDate);
      formData.append("endDate", data.endDate);
      formData.append("foodType", data.foodType);
      formData.append("latitude", data.latitude);
      formData.append("longitude", data.longitude);
      formData.append("userId", data.userId);

      // Image file validation
      const file = data.imageURL?.[0];
      if (!file) {
        console.error("No file selected!");
        toast.error("Please select an image file!");
        return;
      }
      formData.append("imageURL", file);

      // Debugging: Print FormData values
      console.log("Final FormData Before Sending:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      // Sending request
      const res = await axios.post("/offer/addofferwithfile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data);
      

      if (res.data.message) {
        toast.success("Offer added successfully!");
      } else {
        toast.error("Failed to add offer.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <h1>Add Offer</h1>

        <div className="offer">
          <label htmlFor="offer">Enter the offer:</label>
          <input type="text" id="offer" {...register("offer", { required: true })} />
        </div>

        <div className="desc">
          <label htmlFor="desc">Brief description:</label>
          <input type="text" id="desc" {...register("description", { required: true })} />
        </div>

        <div className="sdate">
          <label htmlFor="sdate">Start date:</label>
          <input
            type="date"
            id="sdate"
            {...register("startDate", { required: true })}
            min={new Date().toLocaleDateString()}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="edate">
          <label htmlFor="edate">End date:</label>
          <input
            type="date"
            id="edate"
            {...register("endDate", { required: true })}
            min={startDate}
          />
        </div>

        <div className="latude">
          <label htmlFor="latude">Latitude:</label>
          <input type="text" id="latude" {...register("latitude", { required: true })} />
        </div>

        <div className="lotude">
          <label htmlFor="lotude">Longitude:</label>
          <input type="text" id="lotude" {...register("longitude", { required: true })} />
        </div>

        <div className="foodtype">
          <label htmlFor="foodtype">Select food type:</label>
          <select id="foodtype" {...register("foodType", { required: true })}>
            <option value="">Select</option>
            <option value="gujarati">Gujarati</option>
            <option value="punjabi">Punjabi</option>
            <option value="chinese">Chinese</option>
            <option value="southindian">South Indian</option>
            <option value="pavbhaji">Pav Bhaji</option>
            <option value="italian">Italian</option>
          </select>
        </div>

        <div>
          <label htmlFor="img">Add Image of your offer:</label>
          <input type="file" id="img" {...register("imageURL", { required: true })} />
        </div>

        <div className="submit">
          <input type="submit" style={{ backgroundColor: "rgb(76, 76, 255)", color: "white" }} />
        </div>
      </form>
    </div>
  );
};

export default AddOffer;
