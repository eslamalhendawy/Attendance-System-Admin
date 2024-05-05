import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../apiRequest/Services";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import image from "/assets/newPasswordImage.png";

const ResetPassword = () => {
  const email = localStorage.getItem("email");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    if(password === "" || confirmPassword === ""){
      toast.error("Please fill all the fields");
      return;
    }
    if(password !== confirmPassword){
      toast.error("Passwords do not match");
      return;
    }
    toast.info("Resetting password...");
    let temp = await postData("admins/passwordResetForAdmins", { email, password, passwordConfirm: confirmPassword});
    if(temp.status === "success"){
      toast.success(temp.message);
      localStorage.removeItem("email");
      navigate("/");
    }else{
      toast.error("Something went wrong please try again");
    }
  }

  return (
    <section className="minHeight flex items-center justify-center px-6">
      <div className="container mx-auto bg-white py-6 px-6 md:py-0 md:px-0  rounded-xl md:flex gap-6 items-center loginShadow">
        <div className="hidden md:block md:basis-1/2">
          <img src={image} alt="" />
        </div>
        <div className="flex flex-col items-center md:basis-1/2">
          <h3 className="text-2xl xl:text-4xl w-full md:w-[80%] xl:w-[60%] font-semibold mb-4 text-center">Forgot Password</h3>
          <p className="mb-8 xl:mb-20 w-full md:w-[80%] xl:w-[60%] text-center xl:text-lg text-[#606060]">Please, enter your new password.</p>
          <div className="flex items-center gap-4 border-b border-black pb-2 px-2 mb-8 w-full md:w-[80%] xl:w-[60%]">
            <i className="fa-solid fa-lock"></i>
            <input onChange={(e) => setPassword(e.target.value)} type="password" className="outline-none lg:text-lg grow" placeholder="New Password"/>
          </div>
          <div className="flex items-center gap-4 border-b border-black pb-2 px-2 mb-8 w-full md:w-[80%] xl:w-[60%]">
            <i className="fa-solid fa-lock"></i>
            <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="outline-none lg:text-lg grow" placeholder="Confirm New Password"/>
          </div>
          <div className="md:w-[80%] xl:w-[60%] mt-10">
            <button onClick={handleClick} className="text-center bg-accent hover:bg-primary duration-300 text-white py-3 px-12 rounded-xl text-xl block w-full">Finish</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResetPassword