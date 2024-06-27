import { useState, useEffect } from "react";
import { updateData, getData } from "../apiRequest/Services";
import { useNavigate } from "react-router-dom";

import Modal from "@mui/material/Modal";
import Select from "react-select";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "2px solid black",
    width: "250px",
    padding: "0px",
    boxShadow: state.isFocused ? "0 0 0 2px #2868c7" : null,
    outline: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#2868c7" : null,
    color: state.isSelected ? "#fff" : null,
  }),
};

const EditCourseModal = ({ course }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(course.courseName);
  const [code, setCode] = useState(course.courseCode);
  const [doctor, setDoctor] = useState("");
  const [doctorsList, setDoctorsList] = useState([]);
  const [prerequisites, setPrerequisites] = useState([]);
  const [coursesList, setCoursesList] = useState([{ value: "none", label: "No Prerequisites" }]);
  const adminID = localStorage.getItem("adminID");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      let response = await getData("doctors", adminID);
      if (response.status === "success") {
        setDoctorsList(response.data.doctors.map((doctor) => ({ value: doctor._id, label: doctor.name })));
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      let response = await getData("courses", adminID);
      if (response.status === "success") {
        setCoursesList((prevCoursesList) => [...prevCoursesList, ...response.data.courses.map((course) => ({ value: course.courseCode, label: course.courseName }))]);
      }
    };
    fetchCourses();
  }, []);

  const handleUpdate = async () => {
    let tempPrerequisites = [];
    if (name === "" || code === "" || doctor === "" || prerequisites.length === 0) {
      toast.error("Please fill all the fields");
      return;
    }
    if (prerequisites.includes("none")) {
      tempPrerequisites = [];
    } else {
      tempPrerequisites = prerequisites;
    }
    toast.info("Updating Course Data");
    const response = await updateData(`courses/${course._id}`, { courseName: name, courseCode: code, doctorId: doctor, prerequisites: tempPrerequisites }, adminID);
    if (response.status === "success") {
      toast.success("Course Data Updated Successfully");
      setOpen(false);
      navigate("/get-course");
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="bg-accent hover:bg-primary duration-300 text-white py-3 px-12 rounded-lg text-xl text-center">
        Edit Course Data
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="bg-white p-6 w-[300px] sm:w-[550px]">
            <h1 className="text-2xl text-center underline font-semibold mb-6">Edit Course Data</h1>
            <div className="flex flex-col items-center gap-2 mb-8">
              <div className="flex flex-col gap-2 w-[250px]">
                <label htmlFor="name" className="text-lg font-semibold">
                  Course Name
                </label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="border-2 border-black p-1 outline-none" />
              </div>
              <div className="flex flex-col gap-2 w-[250px]">
                <label htmlFor="name" className="text-lg font-semibold">
                  Course Code
                </label>
                <input type="text" id="name" value={code} onChange={(e) => setCode(e.target.value)} className="border-2 border-black p-1 outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-lg font-semibold">
                  Doctor
                </label>
                <Select onChange={(e) => setDoctor(e.value)} styles={customStyles} options={doctorsList} placeholder="" />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="name" className="text-lg font-semibold">
                  Prerequisites
                </label>
                <Select onChange={(e) => setPrerequisites(e.map((course) => course.value))} isMulti styles={customStyles} options={coursesList} placeholder="" />
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setOpen(false)} className="bg-accent hover:bg-primary duration-300 text-white py-2 px-12 rounded-lg text-xl">
                  Cancel
                </button>
                <button onClick={handleUpdate} className="bg-accent hover:bg-primary duration-300 text-white py-2 px-12 rounded-lg text-xl">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditCourseModal;
