import { useState } from "react";
import { postData } from "../apiRequest/Services";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DeleteDoctorModal from "./DeleteDoctorModal";
import UpdateDoctorModal from "./UpdateDoctorModal";

const EditDoctor = () => {
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [doctorData, setDoctorData] = useState({});
  const adminID = localStorage.getItem("adminID");
  const regEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

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
    setLoading(true);
    let response = await postData("doctors/getDoctorByEmail", { email }, adminID);
    if (response.status === "success") {
      toast.success("Student Data Fetched Successfully");
      setFetched(true);
      setLoading(false);
      setDoctorData(response.data.doctor);
    } else {
      toast.error("Make sure you entered correct email or try again later.");
      setLoading(false);
    }
  }

  return (
    <section className="grow">
      <h1 className="capitalize text-3xl text-center mt-12 mb-12 underline">edit for doctor</h1>
      <div className="flex flex-col items-center justify-center gap-8 mb-20">
        <div className="flex items-center justify-center gap-8">
          <label htmlFor="email" className="font-[600] text-2xl">
            Doctor E-mail :
          </label>
          <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="py-1 px-2 outline-none"/>
        </div>
        <div className="flex justify-center">
          <button disabled={loading} onClick={handleSearch} className={`bg-accent hover:bg-primary duration-300 text-white py-4 px-12 rounded-lg text-xl ${loading && "bg-primary"}`}>
            Get Doctor Data
          </button>
        </div>
      </div>
      {fetched && (
        <>
          <div className="flex justify-center mb-12">
            <div className="">
              <p className="mb-3 font-bold text-lg">
                Name: <span className="font-[500]">{doctorData.name}</span>
              </p>
              <p className="mb-3 font-bold text-lg">
                Email: <span className="font-[500]">{doctorData.email}</span>
              </p>
            </div>
          </div>
          <h4 className="font-bold text-xl mb-8 w-[80%] mx-auto">Courses:</h4>
          <div className="flex flex-wrap gap-4 mb-8 w-[80%] mx-auto">
            {doctorData.courses.map((course, index) => (
              <div className="text-white bg-[#575AA2] py-2 px-4 rounded-lg capitalize" key={index}>
                {course.courseName}
              </div>
            ))}
            {doctorData.courses.length === 0 && <p className="text-red-500 text-lg">No Courses Found</p>}
          </div>
          <div className="flex items-center justify-end mr-12 gap-8">
            <UpdateDoctorModal setFetched={setFetched} doctorEmail={email} setEnteredEmail={setEmail} />
            <DeleteDoctorModal doctor={doctorData} />
          </div>
        </>
      )}
    </section>
  )
}

export default EditDoctor