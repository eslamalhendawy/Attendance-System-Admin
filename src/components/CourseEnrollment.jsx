import { useState } from "react";
import { postData } from "../apiRequest/Services";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseEnrollment = () => {
  const [code, setCode] = useState("");
  const [studentCode, setStudentCode] = useState("");
  
  const handleClick = async () => {
    if (code === "" || studentCode === "") {
      toast.error("Please fill the course code and student ID");
      return;
    }
    toast.info("Enrolling student to course...");
    const response = await postData("admins/enroll", { courseCode: code, studentId: studentCode }, localStorage.getItem("adminID"));
    console.log(response);
    if(response.status === "success") {
      toast.success("Student enrolled successfully");
      setCode("");
      setStudentCode("");
    }else{
      toast.error(response.response.data.message);
    }
  };


  const handleCancel = () => {
    setCode("");
    setStudentCode("");
  };

  return (
    <section className="grow">
      <h1 className="font-semibold text-2xl text-center mb-12">Course enrollment</h1>
      <h4 className="capitalize text-center font-[300] text-3xl xl:text-4xl mb-24">Student must have all prerequisites of the course   </h4>
      <div className="md:w-[50%] lg:w-[45%] xl:lg-[30%] mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 mb-8">
        <span className="font-medium text-xl">Student ID :</span>
        <input value={studentCode} onChange={(e) => setStudentCode(e.target.value)} className="px-2 py-4 rounded-lg outline-none w-[300px]" type="text" />
      </div>
      <div className="md:w-[50%] lg:w-[45%] xl:lg-[30%] mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 mb-24">
        <span className="font-medium text-xl">Course Code :</span>
        <input value={code} onChange={(e) => setCode(e.target.value)} className="px-2 py-4 rounded-lg outline-none w-[300px]" type="text" />
      </div>
      <div className="w-[80%] xl:w-[40%] mx-auto flex justify-between mb-12">
        <button onClick={handleCancel} to="/" className="bg-accent hover:bg-primary duration-300 text-white py-3 px-12 rounded-lg text-xl text-center">
          Cancel
        </button>
        <button onClick={handleClick} className="bg-accent hover:bg-primary duration-300 text-white py-3 px-12 rounded-lg text-xl text-center">
          Enroll
        </button>
      </div>
    </section>
  );
};

export default CourseEnrollment;
