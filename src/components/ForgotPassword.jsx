import { useNavigate } from "react-router-dom";
import { postData } from "../apiRequest/Services";

import image from "/assets/forgotPasswordImage.png";
import { useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email,setEmail] = useState("");
  const regEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  const navigate = useNavigate();

  const handleClick= async () => {
    if(email === ""){
      toast.error("Please enter your email");
      return;
    }
    if(!regEmail.test(email)){
      toast.error("Please enter a valid email");
      return;
    }
    toast.info("Sending mail...");
    let temp = await postData("admins/forgotPassword", { email });
    if(temp.status === "success"){
      toast.success(temp.message);
      localStorage.setItem("email", email);
      navigate("/otp");
    }else{
      toast.error("Something went wrong please try again");
    }
  }
  return (
    <section className="minHeight flex items-center justify-center px-6">
      <div className="container mx-auto bg-white py-6 px-6 md:py-0 md:px-0 rounded-xl md:flex gap-6 items-center loginShadow">
        <div className="hidden md:block md:basis-1/2">
          <img src={image} alt="" />
        </div>
        <div className="flex flex-col items-center md:basis-1/2">
          <h3 className="text-2xl xl:text-4xl w-full md:w-[80%] xl:w-[60%] font-semibold mb-4 text-center">Forgot Password</h3>
          <p className="mb-8 xl:mb-20 w-full md:w-[80%] xl:w-[60%] text-center xl:text-lg text-[#606060]">Enter your E-mail to send a mail to re-assign a new password for your account.</p>
          <div className="flex items-center gap-4 border-b border-black pb-2 px-2 mb-8 w-full md:w-[80%] xl:w-[60%]">
            <i className="fa-solid fa-user"></i>
            <input onChange={(e) => setEmail(e.target.value)} type="text" className="outline-none lg:text-lg grow" placeholder="Email"/>
          </div>
          <div className="md:w-[80%] xl:w-[60%] mt-10">
            <button onClick={handleClick} className="text-center bg-accent hover:bg-primary duration-300 text-white py-3 px-12 rounded-xl text-xl block w-full">Send</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
