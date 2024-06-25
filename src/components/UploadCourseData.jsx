import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postData, getData } from "../apiRequest/Services";
import Select from "react-select";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "0px solid black",
    borderRadius: "8px",
    padding: "8px",
    boxShadow: state.isFocused ? "0 0 0 2px #2868c7" : null,
    outline: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#2868c7" : null,
    color: state.isSelected ? "#fff" : null,
  }),
};

const UploadCourseData = () => {
  const [coursesList, setCoursesList] = useState([{ value: "none", label: "No Prerequisites"}]);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [doctorList, setDoctorList] = useState([]);
  const [prerequisites, setPrerequisites] = useState([]);
  const [loading, setLoading] = useState(false);
  const adminID = localStorage.getItem("adminID");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      let response = await getData("courses", adminID);
      if (response.status === "success") {
        setCoursesList(prevCoursesList => [
          ...prevCoursesList,
          ...response.data.courses.map(course => ({ value: course.courseCode, label: course.courseName }))
        ]);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      let response = await getData("doctors", adminID);
      if (response.status === "success") {
        setDoctorList(response.data.doctors.map((doctor) => ({ value: doctor._id, label: doctor.name })));
      }
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async () => {
    let tempPrerequisites = [];
    if (courseName === "") {
      toast.error("Please Enter Course Name");
      return;
    }
    if (courseCode === "") {
      toast.error("Please Enter Course Code");
      return;
    }
    if (doctorId === "") {
      toast.error("Please Select Doctor");
      return;
    }
    if (prerequisites.length === 0) {
      toast.error("Please Choose If Course Has Prerequisites Or Not");
      return;
    }
    if (prerequisites.includes("none")) {
      tempPrerequisites = [];
    }else{
      tempPrerequisites = prerequisites;
    }
    toast.info("Saving Data...");
    setLoading(true);
    const response = await postData("courses", { courseName, courseCode, doctorId, prerequisites: tempPrerequisites }, adminID);
    console.log(response);
    if(response.status === "success") {
      toast.success("Course Data Saved Successfully");
      localStorage.setItem("newCourse", JSON.stringify(response.data.course));
      navigate("/new-course-data");
      setCourseName("");
      setCourseCode("");
      setDoctorId("");
      setPrerequisites([]);
    } else {
      toast.error("Failed to Save Course Data");
    }
  };
  return (
    <section className="grow">
      <h1 className="font-semibold text-2xl text-center mb-12">Upload Course Data</h1>
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col gap-2 w-[30%]">
          <label htmlFor="name" className="font-semibold text-lg">
            Course Name :
          </label>
          <input value={courseName} onChange={(e) => setCourseName(e.target.value)} className="p-2 rounded-lg outline-none" type="text" id="name" />
        </div>
        <div className="flex flex-col gap-2 w-[30%]">
          <label htmlFor="code" className="font-semibold text-lg">
            Course Code :
          </label>
          <input value={courseCode} onChange={(e) => setCourseCode(e.target.value)} className="p-2 rounded-lg outline-none" type="text" id="code" />
        </div>
        <div className="flex flex-col gap-2 w-[30%]">
          <label className="font-semibold text-lg">Doctor :</label>
          <Select onChange={(e) => setDoctorId(e.value)} styles={customStyles} options={doctorList} placeholder="" />
        </div>
        <div className="flex flex-col gap-2 w-[30%]">
          <label className="font-semibold text-lg">Prerequisites :</label>
          <Select onChange={(e) => setPrerequisites(e.map((course) => course.value))} isMulti styles={customStyles} options={coursesList} placeholder=""/>
        </div>
        <button disabled={loading} onClick={handleSubmit} className={`bg-accent hover:bg-primary duration-300 text-white py-2 px-16 rounded-xl text-xl ${loading && "bg-primary"}`}>
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </section>
  );
};

export default UploadCourseData;
