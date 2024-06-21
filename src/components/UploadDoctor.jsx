import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { postData } from "../apiRequest/Services";

const UploadDoctor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const adminID = localStorage.getItem("adminID");
  const regEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  const navigate = useNavigate();

  const handleClick = async () => {
    if (name === "") {
      toast.error("Please Enter Doctor Name");
      return;
    }
    if (email === "") {
      toast.error("Please Enter Doctor Email");
      return;
    }
    if (!regEmail.test(email)) {
      toast.error("Invalid Email");
      return;
    }
    toast.info("Uploading Doctor...");
    let response = await postData("doctors", { name, email }, adminID);
    if (response.status === "success") {
      toast.success("Doctor Uploaded Successfully");
      localStorage.setItem("newDoctor", JSON.stringify(response.data.doctor));
      navigate("/new-doctor");
      setName("");
      setEmail("");
    } else {
      toast.error("Error in uploading Doctor");
    }
  };
  return (
    <section className="grow">
      <h1 className="capitalize text-3xl text-center mt-12 mb-24 underline">Enter doctor data</h1>
      <div className="flex flex-col items-center gap-8 mb-24">
        <div className="flex flex-col gap-2 xl:w-[30%]">
          <label htmlFor="name" className="font-semibold text-lg">
           Doctor Name :
          </label>
          <input onChange={(e) => setName(e.target.value)} value={name} className="p-2 rounded-lg outline-none" type="text" id="name" />
        </div>
        <div className="flex flex-col gap-2 xl:w-[30%]">
          <label htmlFor="email" className="font-semibold text-lg">
           Doctor Email :
          </label>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className="p-2 rounded-lg outline-none" type="text" id="email" />
        </div>
      </div>
      <div className="xl:w-[30%] mx-auto flex justify-between items-center gap-4">
        <Link className="bg-accent hover:bg-primary duration-300 text-white py-2 px-12 rounded-lg text-xl" to="/">Cancel</Link>
        <button onClick={handleClick} className="bg-accent hover:bg-primary duration-300 text-white py-2 px-12 rounded-lg text-xl">Save</button>
      </div>
    </section>
  );
};

export default UploadDoctor;
