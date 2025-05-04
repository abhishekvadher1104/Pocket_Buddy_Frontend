import React, { useState } from "react";
import styles from "../../styles/login.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import addUser from "../../assets/images/add-user.png";
import homePage from "../../assets/images/home-button.png";
import forgotPassword from "../../assets/images/wrong-password.png";

import { Link, useNavigate } from "react-router-dom";
import Loader from "../layouts/Loader";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [isload, setIsload] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validationSchema = {
    emailValidation: {
      required: {
        value: true,
        message: "Email is required*",
      },
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid Email Format*",
      },
    },
    passwordValidation: {
      required: {
        value: true,
        message: "Password is required*",
      },
      minLength: {
        value: 8,
        message: "minimum 8 characters are required*",
      },
      pattern: {
        value:
          /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%&?*])[A-Za-z\d!@#$%&*?]{8,}$/,
        message:
          "Must include uppercase, lowercase, number, and a special character.*",
      },
    },
  };
  
  const submitHandler = async (data) => {
    setIsload(true);
    try {
      const res = await axios.post("/login", data);
      console.log(res);
      if (res.status === 200) {
        toast.success("login success as " + res.data.data.role, {
          position: "top-center",
          autoClose: 3000,
        });
        localStorage.setItem("id", res.data.data?._id);
        localStorage.setItem("role", res.data.data?.role);
        if (res.data.data.role === "user") {
          navigate("/user/profile");
        } else if (res.data.data.role === "restaurant_owner") {
          navigate("/restro_owner/profile");
        } else {
          toast.error("cannot get user...", {
            position: "top-center",
            autoClose: 3000,
          });
        }
      }
    } catch (error) {
      toast.error("Invalid Credentials", {
        position: "top-center",

        autoClose: 3000,
      });
    } finally {
      setIsload(false);
    }

    console.log(data);
  };
  return (
    <center>
      {isload ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className={styles.innercontainer}>
            <div className={styles.inputs}>
              <h1>Login</h1>
              <div className={styles.inputonly}>
                <div className={styles.email}>
                  <label htmlFor="email"> &nbsp; Email : &nbsp; </label>
                  <input
                    type="email"
                    placeholder=" i.e. abc@xyz.com"
                    id="email"
                    {...register("email", validationSchema.emailValidation)}
                  />
                  <div className={`${styles.errors} ${styles.emal}`}>
                    {errors.email?.message}
                  </div>
                </div>
                <div className={styles.password}>
                  <label htmlFor="password">&nbsp;Password : &nbsp; </label>
                  <input
                    type="password"
                    placeholder=" i.e. a&ce#r%3"
                    id="password"
                    autoComplete="current-password"
                    {...register("password")}
                  />
                  {/* <div className={`${styles.errors} ${styles.pswrd}`}>
                  {errors.password?.message}
                </div> */}
                </div>
              </div>
              <div className={styles.submit}>
                <div>
                  <input type="submit" value="submit" />
                </div>
              </div>
              <div className={styles.additionalFunctionality}>
                <div>
                  <Link to={"/signup"} title="create Account">
                    <img src={addUser} alt="" />
                  </Link>
                </div>

                <div>
                  <Link to={"/forgotpassword"} title="Reset Password"><img src={forgotPassword} alt="" /></Link>
                </div>
                <div>
                  <Link to={'/'} title="HomePage"> <img src={homePage} /></Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </center>
  );
};

export default Login;
