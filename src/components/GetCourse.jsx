import { useState } from "react";
import { postData } from "../apiRequest/Services";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetCourse = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    if (code === "") {
      toast.error("Please fill the course code");
      return;
    }
    toast.info("Fetching course data...");
    const response = await postData("courses/getCourseByCourseCode", { courseCode: code }, localStorage.getItem("adminID"));
    if (response.status === "success") {
      localStorage.setItem("courseCode", code);
      navigate("/edit-course");
      toast.success("Course data fetched successfully");
    }
  };

  return (
    <section className="grow">
      <h1 className="font-semibold text-2xl text-center mb-12">Edit Course Data</h1>
      <h4 className="capitalize text-center font-[300] text-3xl xl:text-4xl mb-24">Enter course code to get course data</h4>
      <div className="md:w-[50%] lg:w-[45%] xl:lg-[30%] mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 mb-24">
        <span className="font-medium text-xl">Course Code :</span>
        <input onChange={(e) => setCode(e.target.value)} className="px-2 py-4 rounded-lg outline-none w-[300px]" type="text" />
      </div>
      <div className="w-[80%] xl:w-[40%] mx-auto flex justify-between mb-12">
        <Link to="/" className="bg-accent hover:bg-primary duration-300 text-white py-3 px-12 rounded-lg text-xl text-center">
          Cancel
        </Link>
        <button onClick={handleClick} className="bg-accent hover:bg-primary duration-300 text-white py-3 px-12 rounded-lg text-xl text-center">
          Get Course Data
        </button>
      </div>
    </section>
  );
};

export default GetCourse;
