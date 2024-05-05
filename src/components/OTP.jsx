import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../apiRequest/Services";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import image from "/assets/otpImage.png";

function OTP() {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const handleChange = (e, i) => {
    setOtp([...otp.map((data, index) => (index === i ? e.target.value : data))]);
    if (e.target.value.length === 1 && i < 3) {
      e.target.nextElementSibling.focus();
    }
    if (e.target.value.length === 0 && i > 0) {
      e.target.previousElementSibling.focus();
    }
  };

  const handleClick = async () => {
    if (otp.join("").length < 4) {
      toast.error("Please Enter the OTP");
      return;
    }
    toast.info("Verifying...");
    let temp = await postData("admins/confirmPasswordResetCodeForAdmins", { confirmCode: Number(otp.join("")), email });
    if(temp.status === "success"){
      toast.success(temp.message);
      navigate("/reset-password");
    }else{
      toast.error("Something went wrong please try again");
    }
  }

  const handleResend = async () => {
    toast.info("Sending mail...");
    let temp = await postData("admins/forgotPassword", { email });
    if(temp.status === "success"){
      toast.success(temp.message);
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
          <p className="mb-8 w-full md:w-[80%] xl:w-[60%] text-center xl:text-lg text-[#606060]">Type the  you confirmation code received on your e-mail to continue resetting your password.</p>
          <div className="w-full md:w-[80%] xl:w-[60%] flex items-center justify-center gap-[10px] lg:gap-[30px] mb-12">
            {otp.map((data, index) => (
              <input value={data} onChange={(e) => handleChange(e, index)} maxLength={1} className="w-[50px] p-2 text-center border-b-2 outline-none border-black text-xl text-black" key={index} type="password" />
            ))}
          </div>
          <div className="w-full md:w-[80%] xl:w-[60%] text-center">
            <button onClick={handleResend} className=" text-accent cursor-pointer">Resend</button>
          </div>
          <div className="md:w-[80%] xl:w-[60%] mt-10">
            <button onClick={handleClick} to="/reset-password" className="text-center bg-accent hover:bg-primary duration-300 text-white py-3 px-12 rounded-xl text-xl block w-full">
              Verify
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OTP;
