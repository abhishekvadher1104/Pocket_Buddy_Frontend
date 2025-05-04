import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();
  const submitHandler = async (data) => {
    try {
      const email = data.email;
      const res = await axios.post("/user/forgotpassword", { email });
      toast.success("Mail sent to your registered Email");
    } catch (error) {
      toast.error("Email not Found");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <h1>Reset Password</h1>
          <p>Please Enter your Register Email address Below: </p>
        </div>
        <div>
          <label htmlFor="em">Email: </label>
          <input type="email" id="em" {...register("email")} />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
