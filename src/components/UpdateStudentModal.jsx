import { useState, useEffect } from "react";
import { postData, updateData, getData } from "../apiRequest/Services";

import Modal from "@mui/material/Modal";
import Select from "react-select";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const options = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
];

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

const UpdateStudentModal = ({ setFetched, enteredEmail, setEnteredEmail }) => {
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("");
  const [passedCourses, setPassedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const [add, setAdd] = useState(false);
  const [newPassedCourse, setNewPassedCourse] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("adminID");

  const [defaultValue, setDefaultValue] = useState({ value: "1", label: "1" });

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      const response = await postData("students/getStudentByEmail", { email: enteredEmail }, token);
      if (response.status === "success") {
        setId(response.data.student._id);
        setName(response.data.student.name);
        setEmail(response.data.student.email);
        setLevel(response.data.student.level);
        setDefaultValue({ value: response.data.student.level, label: response.data.student.level });
        setPassedCourses(response.data.student.passedCourses);
        setCourses(response.data.student.courses);
        setLoading(false);
      } else {
        toast.error("Failed to Fetch Student Data");
        setLoading(false);
      }
    };
    fetchStudent();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      let response = await getData("courses", token);
      console.log(response);
      if (response.status === "success") {
        setCoursesList((prevCoursesList) => [...prevCoursesList, ...response.data.courses.map((course) => ({ value: course.courseCode, label: course.courseName }))]);
      }
    };
    fetchCourses();
  }, []);

  const handleUpdate = async () => {
    toast.info("Updating Student...");
    const data = {
      name,
      email,
      level,
      passedCourses: [...passedCourses, newPassedCourse],
    };
    console.log(data);
    if (newPassedCourse === "") {
      data.passedCourses = passedCourses;
    }
    const response = await updateData(`students/${id}`, data, token);
    if (response.status === "success") {
      toast.success("Student Updated Successfully");
      setEnteredEmail("");
      setOpen(false);
      setFetched(false);
    } else {
      toast.error("Failed to Update Student");
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="bg-accent hover:bg-primary duration-300 text-white py-4 w-[150px] rounded-lg text-xl capitalize">
        update Data
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="bg-white p-6 w-[300px] sm:w-[550px]">
            {!loading && (
              <>
                <h1 className="text-2xl text-center underline font-semibold mb-4">Student Update</h1>
                <div className="flex flex-col items-center gap-3 mb-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-lg font-semibold">
                      Name
                    </label>
                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" id="name" className="border-2 border-black p-1 outline-none placeholder:text-black w-[250px]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-lg font-semibold">
                      E-mail
                    </label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" id="name" className="border-2 border-black p-1 outline-none placeholder:text-black w-[250px]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-lg font-semibold">
                      Level
                    </label>
                    <Select defaultValue={defaultValue} onChange={(e) => setLevel(e.value)} styles={customStyles} options={options} placeholder="Select Student Level" />
                  </div>
                </div>
                <h4 className="font-bold text-xl mb-4">Courses:</h4>
                <div className="flex flex-wrap gap-4 mb-6">
                {courses.length === 0 && <p className="text-red-500 text-lg">No Courses</p>}
                  {courses.map((course, index) => (
                    <div className="text-white bg-[#575AA2] py-2 px-4 rounded-lg capitalize" key={index}>
                      {course.courseName}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center gap-3 mb-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="passedCourses" className="text-lg font-semibold">
                      Passed Courses:
                    </label>
                    <Select onChange={(e) => setPassedCourses(e.map((course) => course.value))} styles={customStyles} options={coursesList} isMulti placeholder="" />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4">
                  <button onClick={() => setOpen(false)} className="py-2 w-[100px] bg-accent hover:bg-primary duration-200 rounded-lg text-white">
                    Cancel
                  </button>
                  <button onClick={handleUpdate} className="py-2 w-[100px] bg-accent hover:bg-primary duration-200 rounded-lg text-white">
                    Save
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdateStudentModal;
