import { useState, useEffect } from "react";
import { postData, getData } from "../apiRequest/Services";
import Select from "react-select";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const options = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
];

const tempCourses = [
  { value: "course1", label: "course1" },
  { value: "course2", label: "course2" },
  { value: "course3", label: "course3" },
  { value: "course4", label: "course4" },
];

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

const AddSingleStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("");
  const [courses, setCourses] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const regEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  const adminID = localStorage.getItem("adminID");

  useEffect(() => {
    const fetchCourses = async () => {
      let response = await getData("courses", adminID);
      if (response.status === "success") {
        setCoursesList(response.data.courses.map((course) => ({ value: course._id, label: course.courseName })));
      }
    };
    fetchCourses();
  }, []);

  const handleSubmit = async () => {
    if (name === "") {
      toast.error("Please Enter Student Name");
      return;
    }
    if (email === "") {
      toast.error("Please Enter Student Email");
      return;
    }
    if (!regEmail.test(email)) {
      toast.error("Invalid Email");
      return;
    }
    if (level === "") {
      toast.error("Please Select Student Level");
      return;
    }
    if (courses.length === 0) {
      toast.error("Please Select Student Courses");
      return;
    }
    toast.info("Saving Student Data...");
    setLoading(true);
    let response = await postData("students", { name, email, level, courses }, adminID);
    if (response.status === "success") {
      toast.success("Student Data Saved Successfully");
      setLoading(false);
    }
  };

  return (
    <section className="grow">
      <h1 className="font-semibold text-2xl text-center mb-12">Student Data</h1>
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col gap-2 w-[30%]">
          <label htmlFor="name" className="font-semibold text-lg">
            Name :
          </label>
          <input onChange={(e) => setName(e.target.value)} className="p-2 rounded-lg outline-none" type="text" id="name" />
        </div>
        <div className="flex flex-col gap-2 w-[30%]">
          <label htmlFor="email" className="font-semibold text-lg">
            E-mail :
          </label>
          <input onChange={(e) => setEmail(e.target.value)} className="p-2 rounded-lg outline-none" type="text" id="email" />
        </div>
        <div className="flex flex-col gap-2 w-[30%]">
          <label className="font-semibold text-lg">Level :</label>
          <Select onChange={(e) => setLevel(e.value)} styles={customStyles} options={options} placeholder="Select Student Level" />
        </div>
        <div className="flex flex-col gap-2 w-[30%] mb-[100px]">
          <label className="font-semibold text-lg">Passed Course :</label>
          <Select onChange={(e) => setCourses(e.map((course) => course.value))} isMulti styles={customStyles} options={coursesList} placeholder="Select Student Courses" />
        </div>
        <button disabled={loading} onClick={handleSubmit} className={`bg-accent hover:bg-primary duration-300 text-white py-2 px-16 rounded-xl text-xl ${loading && "bg-primary"}`}>
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </section>
  );
};

export default AddSingleStudent;
