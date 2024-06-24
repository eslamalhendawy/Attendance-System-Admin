import { useState } from "react";
import { postData } from "../apiRequest/Services";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DeleteStudentModal from "./DeleteStudentModal";
import UpdateStudentModal from "./UpdateStudentModal";

const EditStudent = () => {
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [studentData, setStudentData] = useState({});
  const adminID = localStorage.getItem("adminID");
  const regEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

  const handleSearch = async () => {
    setFetched(false);
    if (email === "") {
      toast.error("Please Enter Student Email");
      return;
    }
    if (!regEmail.test(email)) {
      toast.error("Invalid Email");
      return;
    }
    toast.info("Fetching Student Data...");
    setLoading(true);
    let response = await postData("students/getStudentByEmail", { email }, adminID);
    if (response.status === "success") {
      toast.success("Student Data Fetched Successfully");
      setStudentData(response.data.student);
      setFetched(true);
      setLoading(false);
    } else {
      toast.error("Make sure you entered correct email or try again later.");
      setLoading(false);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="grow">
      <h1 className="capitalize text-3xl text-center mt-12 mb-12 underline">edit for student</h1>
      <div className="flex flex-col items-center justify-center gap-8 mb-20">
        <div className="flex items-center justify-center gap-8">
          <label htmlFor="email" className="font-[600] text-2xl">
            Student E-mail :
          </label>
          <input onKeyDown={(e) => handleEnter(e)} id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="py-1 px-2 outline-none" />
        </div>
        <div className="flex justify-center">
          <button disabled={loading} onClick={handleSearch} className={`bg-accent hover:bg-primary duration-300 text-white py-4 px-12 rounded-lg text-xl ${loading && "bg-primary"}`}>
            {loading ? "Loading..." : "Get student data"}
          </button>
        </div>
      </div>
      {fetched && (
        <>
          <div className="flex justify-center mb-12">
            <div className="">
              <p className="mb-3 font-bold text-lg">
                Name: <span className="font-[500]">{studentData.name}</span>
              </p>
              <p className="mb-3 font-bold text-lg">
                Email: <span className="font-[500]">{studentData.email}</span>
              </p>
              <p className="font-bold text-lg">
                Level: <span className="font-[500]">{studentData.level}</span>
              </p>
            </div>
          </div>
          <h4 className="font-bold text-xl mb-8 w-[80%] mx-auto">Courses:</h4>
          <div className="flex flex-wrap gap-4 mb-8 w-[80%] mx-auto">
            {studentData.courses.map((course, index) => (
              <div className="text-white bg-[#575AA2] py-2 px-4 rounded-lg capitalize" key={index}>
                {course.courseName}
              </div>
            ))}
          </div>
          <h4 className="font-bold text-xl mb-8 w-[80%] mx-auto">Passed Courses:</h4>
          <div className="flex gap-4 mb-8 w-[80%] mx-auto">
            {studentData.passedCourses.map((course, index) => (
              <div className="text-white bg-[#575AA2] py-2 px-4 rounded-lg capitalize" key={index}>
                {course}
              </div>
            ))}
            {studentData.passedCourses.length === 0 && <p className="text-red-500 text-lg">No Passed Courses</p>}
          </div>
          <div className="flex items-center justify-end mr-12 gap-8">
            <UpdateStudentModal setFetched={setFetched} enteredEmail={email} setEnteredEmail={setEmail} />
            <DeleteStudentModal student={studentData} />
          </div>
        </>
      )}
    </section>
  );
};

export default EditStudent;
