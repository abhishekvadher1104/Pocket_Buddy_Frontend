import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
// import '../../styles/'

const AddOffer = () => {
  const { register, handleSubmit } = useForm();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    getAllStates();
  }, []);

  const getAllStates = async () => {
    const res = await axios.get("/state/getallstates");
    console.log(res.data.data);
    
    setStates(res.data.data);
  }

  const getCityByStateId = async (id) => {
    const res = await axios.get("/city/getcitybystateid/" + id);
    console.log(res.data.data);
        
    setCities(res.data.data);
  };
  const getAreaByCityId = async (id) => {
    const res = await axios.get("/area/getareabycityid/" + id);
    setAreas(res.data.data);
  };

  const submitHandler = async (data) => {
    data.userId = localStorage.getItem("id");
    console.log(data);

    try {
      const formdata = new FormData();
      formdata.append("restroName", data.restroName);
      formdata.append("offer", data.offer);
      formdata.append("description", data.description);
      formdata.append("startDate", data.startDate);
      formdata.append("endDate", data.endDate);
      formdata.append("latitude", data.latitude);
      formdata.append("longitude", data.longitude);
      formdata.append("foodType", data.foodType);
      formdata.append("areaId", data.areaId);
      formdata.append("cityId", data.cityId);
      formdata.append("stateId", data.stateId);
      formdata.append("image", data.image[0]);
      formdata.append("userId", data.userId);

      console.log(formdata);

      const res = await axios.post("/offer/addofferwithfile", formdata);
      console.log(res);

      if (res.status == 200) {
        toast.success("data added successfully");
      } else {
        toast.error("failed to add data");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="name">
          <label htmlFor="name">Enter Restaurant Name : </label>
          <input type="text" id="name" {...register("restroName")} />
        </div>
        <div className="offer">
          <label htmlFor="offer">
            Enter the offer you have in Restaurant:
          </label>
          <input type="text" id="offer" {...register("offer")} />
        </div>
        <div className="desc">
          <label htmlFor="desc">Enter the brief description about offer:</label>
          <input type="text" id="desc" {...register("description")} />
        </div>
        <div className="state">
          <label htmlFor="state">select State: </label>
          <select
            id="state"
            {...register("stateId")}
            onChange={(event) =>{ console.log(event);
             getCityByStateId(event.target.value)}}
          >
            <option value="">select state</option>
            {states?.map((state) => (
              <option key={state._id} value={state._id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div className="city">
          <label htmlFor="city">select City: </label>
          <select
            id="city"
            {...register("cityId")}
            onChange={(event) => getAreaByCityId(event.target.value)}
          >
            <option>select city</option>
            {cities?.map((city) => (
              <option key={city._id} value={city._id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div className="area">
          <label>Select Area</label>
          <select {...register("areaId")}>
            <option>select area</option>
            {areas?.map((area) => (
              <option key={area._id} value={area._id}>
                {area.name}
              </option>
            ))}
          </select>
        </div>
        <div className="sdate">
          <label htmlFor="sdate">Enter the start date for offer: </label>
          <input type="date" id="sdate" {...register("startDate")}  min={new Date().toISOString().split("T")[0]} />
        </div>
        <div className="edate">
          <label htmlFor="edate">Enter the end date for offer: </label>
          <input type="date" id="edate" {...register("endDate")} min={new Date().toISOString().split("T")[0]}/>
        </div>
        <div className="latude">
          <label htmlFor="latude">Enter the Latitude of Restaurant: </label>
          <input type="text" id="latude" {...register("latitude")} />
        </div>
        <div className="lotude">
          <label htmlFor="lotude">Enter the Longitude of Restaurant: </label>
          <input type="text" id="lotude" {...register("longitude")} />
        </div>
        <div className="foodtype">
          <label htmlFor="foodtype">Select type of Food: </label>
          <select id="foodtype" {...register("foodType")}>
            <option value="select">Select</option>
            <option value="gujarati">Gujarati</option>
            <option value="punjabi">Punjabi</option>
            <option value="chinese">Chinese</option>
            <option value="southindian">South indian</option>
            <option value="pavbhaji">Pav-Bhaji</option>
            <option value="italian">Italian</option>
          </select>
        </div>
        <div>
          <label htmlFor="img">add Image of your offer</label>
          <input type="file" id="img" {...register("image")} />
        </div>
        <div className="submit" >
          <input type="submit" style={{backgroundColor:"rgb(76, 76, 255)" , color:"white"}}/>
        </div>
      </form>
    </div>
  );
};

export default AddOffer;
