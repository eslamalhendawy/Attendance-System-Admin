import { useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";
import { postData } from "../apiRequest/Services";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import image from "/assets/loginImage.png";

const Login = () => {
  const { userData, setUserData } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (email === "" || password === "") {
      toast.error("Please fill all the fields");
      return;
    }
    toast.info("Logging in...");
    setLoading(true);
    let temp = await postData("admins/login", { email, password });
    if(temp.status === "success") {
      toast.success("Logged in successfully");
      setUserData({ ...userData, loggedIn: true });
      localStorage.setItem("adminID", temp.token);
    }else{
      toast.error("Invalid email or password");
      setLoading(false);
    }
  }

  return (
    <section className="minHeight flex items-center justify-center px-6">
      <div className="container mx-auto bg-white py-6 px-6 md:py-0 md:px-0 rounded-xl md:flex gap-6 items-center loginShadow">
        <div className="hidden md:block md:basis-1/2">
          <img src={image} alt="" />
        </div>
        <div className="flex flex-col items-center md:basis-1/2">
          <h3 className="text-2xl xl:text-4xl text-center font-semibold mb-8 xl:mb-20">Sign In</h3>
          <div className="flex items-center gap-4 border-b border-black pb-2 px-2 mb-8 w-full md:w-[80%] xl:w-[60%]">
            <i className="fa-solid fa-user"></i>
            <input onChange={(e) => setEmail(e.target.value)} type="text" className="outline-none lg:text-lg grow" placeholder="Email"/>
          </div>
          <div className="flex items-center gap-4 border-b border-black pb-2 px-2 mb-8 w-full md:w-[80%] xl:w-[60%]">
            <i className="fa-solid fa-lock"></i>
            <input onChange={(e) => setPassword(e.target.value)} type="password" className="outline-none lg:text-lg grow" placeholder="Password"/>
          </div>
          <div className="flex items-center justify-between w-full md:w-[80%] xl:w-[60%] mb-6">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <Link to="/forgot-password" className="text-accent">Forgot Password ?</Link>
          </div>
          <button disabled={loading} onClick={handleLogin} className={`bg-accent hover:bg-primary duration-300 text-white py-3 px-12 rounded-xl text-xl block w-full md:w-[80%] xl:w-[60%] ${loading && "bg-primary"}`}>{loading ? "Please Wait" : "Sign In"}</button>
        </div>
      </div>
    </section>
  );
};

export default Login;
