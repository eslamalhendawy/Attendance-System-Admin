import { useState } from "react";
import { postData } from "../apiRequest/Services";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DeleteDoctorModal from "./DeleteDoctorModal";
import UpdateDoctorModal from "./UpdateDoctorModal";

const EditDoctor = () => {
  const [fetched, setFetched] = useState(false);
  const [email, setEmail] = useState("");
  const [doctorData, setDoctorData] = useState({});
  const adminID = localStorage.getItem("adminID");
  const regEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

  const tempDoctor = {
    name: "John Doe",
    email: "test@test.com",
    courses: [
      { courseName: "course 1" },
      { courseName: "course 2" },
      { courseName: "course 3" },
    ],
  }

  const handleSearch = async () => {
    setFetched(false);
    if (email === "") {
      toast.error("Please Enter Doctor Email");
      return;
    }
    if (!regEmail.test(email)) {
      toast.error("Invalid Email");
      return;
    }
    toast.info("Fetching Doctor Data...");
    // let response = await postData("students/getStudentByEmail", { email }, adminID);
    setFetched(!fetched);
    // if (response.status === "success") {
    //   toast.success("Student Data Fetched Successfully");
    //   setDoctorData(response.data.student);
    // } else {
    //   toast.error("Make sure you entered correct email or try again later.");
    // }
  }

  return (
    <section className="grow">
      <h1 className="capitalize text-3xl text-center mt-12 mb-12 underline">edit for doctor</h1>
      <div className="flex flex-col items-center justify-center gap-8 mb-20">
        <div className="flex items-center justify-center gap-8">
          <label htmlFor="email" className="font-[600] text-2xl">
            Doctor E-mail :
          </label>
          <input id="email" onChange={(e) => setEmail(e.target.value)} type="text" className="py-1 px-2 outline-none" placeholder="loerm487@gmail.com" />
        </div>
        <div className="flex justify-center">
          <button onClick={handleSearch} className="bg-accent hover:bg-primary duration-300 text-white py-4 px-12 rounded-lg text-xl">
            Get Doctor Data
          </button>
        </div>
      </div>
      {fetched && (
        <>
          <div className="flex justify-center mb-12">
            <div className="">
              <p className="mb-3 font-bold text-lg">
                Name: <span className="font-[500]">{tempDoctor.name}</span>
              </p>
              <p className="mb-3 font-bold text-lg">
                Email: <span className="font-[500]">{tempDoctor.email}</span>
              </p>
            </div>
          </div>
          <h4 className="font-bold text-xl mb-8 w-[80%] mx-auto">Courses:</h4>
          <div className="flex gap-4 mb-8 w-[80%] mx-auto">
            {tempDoctor.courses.map((course, index) => (
              <div className="text-white bg-[#575AA2] py-2 px-4 rounded-lg capitalize" key={index}>
                {course.courseName}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end mr-12 gap-8">
            <UpdateDoctorModal doctor={tempDoctor} />
            <DeleteDoctorModal doctor={tempDoctor} />
          </div>
        </>
      )}
    </section>
  )
}

export default EditDoctor