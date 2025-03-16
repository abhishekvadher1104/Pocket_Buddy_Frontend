import React from "react";
import styles from "../../styles/login.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
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
    try {
      const res = await axios.post("/login", data);
      console.log(res);


      if (res.status == 200) {
        alert("login successful by " + res.data.data.role);
        localStorage.setItem("id", res.data.data?._id);
        localStorage.setItem("role", res.data.data?.role);

        if (res.data.data.role ===  "user" ) {
          console.log("navigating to user ");
          navigate("/user");
        } else if (res.data.data.role === "restaurant_owner") {
          console.log("navigating to restro_owner");
          navigate("/restro_owner");
        }
        else {
          alert("cannot get user...");
      } 
      }
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };
  return (
    <center>
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
              <input type="submit" value="submit" />
            </div>
          </div>
        </div>
      </form>
    </center>
  );
};

export default Login;
