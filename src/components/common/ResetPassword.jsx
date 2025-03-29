import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const ResetPassword = () => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm();
  const token = useParams().token;
  
  const submitHandler = async (data) => {
    const obj = {
      token: token,
      newPassword: data.newPassword,
    };

    try {
      const res = await axios.post("/user/resetpassword", obj, {
        headers: {
          "Content-Type": "application/json", 
        },
      });
      // alert("password updated succefully");
      toast.success("password updated succefully!")
      navigate('/login')

    } catch (error) {
      // alert("Can't update your password");
      toast.error('cannot update password!')
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <h1>Reset Password</h1>
        <div>
          <label htmlFor="psw">Enter New Password: </label>
          <input type="text" id="psw" {...register("newPassword")} />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
