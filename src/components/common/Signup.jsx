import React, { useState } from "react";
import styles from "../../styles/signup.module.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../layouts/Loader";

const Signup = () => {
  const [isload, setIsload] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitHandler = async (data) => {
    setIsload(true);
    try {
      console.log(data);
      const res = await axios.post("/signup ", data);
      console.log(res.data);
      if (res.status === 201) {
        alert("user created successfully");
        navigate("/login");
      } else {
        navigate("/");
        alert("user not created");
      }
      setIsload(false);
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert("Signup failed. Please try again.");
    } finally {
      setIsload(false);
    }
  };
  const validationSchema = {
    firstnameValidation: {
      required: {
        value: true,
        message: "Firstname is required.*",
      },
    },
    lastnameValidation: {
      required: {
        value: true,
        message: "Lastname is required.*",
      },
    },
    emailValidation: {
      required: {
        value: true,
        message: "Email is required.*",
      },
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid Email Format.*",
      },
    },
    passwordValidation: {
      required: {
        value: true,
        message: "Password is required.*",
      },
      minLength: {
        value: 8,
        message: "minimum 8 characters are required.*",
      },
      pattern: {
        value:
          /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%&?*])[A-Za-z\d!@#$%&*?]{8,}$/,
        message:
          "Must include uppercase, lowercase, number, and a special character.*",
      },
    },
    ageValidation: {
      required: {
        value: true,
        message: "age is required.*",
      },
    },
  };
  return (
    <center>
      {isload ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className={styles.innerdiv}>
            <div className={styles.inputcontainer}>
              <div className={styles.inputtags}>
                <h1>Register Here...</h1>
                <div className={styles.username}>
                  <label htmlFor="fname"> Firstname : &nbsp; </label>
                  <input
                    type="text"
                    placeholder=" i.e. abc"
                    id="fname"
                    {...register(
                      "firstname",
                      validationSchema.firstnameValidation
                    )}
                  />
                  <div className={styles.errors}>
                    {errors.firstname?.message}
                  </div>
                </div>
                <div className={styles.username}>
                  <label htmlFor="lname"> Lastname : &nbsp; </label>
                  <input
                    type="text"
                    placeholder=" i.e. xyz"
                    id="lname"
                    {...register(
                      "lastname",
                      validationSchema.lastnameValidation
                    )}
                  />
                  <div className={styles.errors}>
                    {errors.lastname?.message}
                  </div>
                </div>
                <div className={styles.role}>
                  <label htmlFor="role">Select Role : &nbsp; </label>
                  <select
                    id="role"
                    name="role"
                    className={styles.select}
                    {...register("role")}
                  >
                    <option value="select">Select </option>
                    <option value="user">User</option>
                    <option value="restaurant_owner">Restaurant Owner</option>
                  </select>
                </div>

                <div className={styles.age}>
                  <label htmlFor="age"> Age : &nbsp; </label>
                  <input
                    type="text"
                    placeholder=" i.e. 30"
                    id="age"
                    {...register("age", validationSchema.ageValidation)}
                  />
                  <div className={styles.errors}>{errors.age?.message}</div>
                </div>
                <div className={styles.em}>
                  <label htmlFor="em"> &nbsp; Email : &nbsp; </label>
                  <input
                    type="email"
                    placeholder=" i.e. abc@xyz.com"
                    id="em"
                    {...register("email", validationSchema.emailValidation)}
                  />
                  <div className={styles.errors}>{errors.email?.message}</div>
                </div>
                <div className={styles.psw}>
                  <label htmlFor="pw">&nbsp;Password : &nbsp; </label>
                  <input
                    type="password"
                    placeholder=" i.e. a&ce#r%3"
                    id="pw"
                    {...register("password")}
                  />
                  {/* <div className={`${styles.errors} ${styles.pswerr}`}>{errors.password?.message}</div> */}
                </div>
                <div className={styles.sbmt}>
                  <input type="submit" value="submit" />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </center>
  );
};

export default Signup;
