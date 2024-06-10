import { useState } from "react";
import { updateData } from "../apiRequest/Services";

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
    padding: "1px",
    boxShadow: state.isFocused ? "0 0 0 2px #2868c7" : null,
    width: "204px",
    outline: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#2868c7" : null,
    color: state.isSelected ? "#fff" : null,
  }),
};

const UpdateStudentModal = ({student, setFetched}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("");
  const [passedCourses, setPassedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("adminID");

  const handleUpdate = async () => {
    toast.info("Updating Student...");
    const data = {
      name,
      email,
      level,
      passedCourses,
    };
    if(name === ""){
      data.name = student.name;
    }
    if(email === ""){
      data.email = student.email;
    }
    if(level === ""){
      data.level = student.level;
    }
    if(passedCourses.length === 0){
      data.passedCourses = student.passedCourses;
    }
    const response = await updateData(`students/${student._id}`, data, token);
    console.log(response);
    if (response.status === "success") {
      toast.success("Student Updated Successfully");
      setOpen(false);
      setFetched(false);
    }else{
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
            <h1 className="text-2xl text-center underline font-semibold mb-4">Student Update</h1>
            <div className="flex flex-col items-center gap-3 mb-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-lg font-semibold">
                  Name
                </label>
                <input onChange={(e) => setName(e.target.value)} type="text" id="name" placeholder={student.name} className="border-2 border-black p-1 outline-none placeholder:text-black w-[204px]" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-lg font-semibold">
                  E-mail
                </label>
                <input onChange={(e) => setEmail(e.target.value)} type="text" id="name" placeholder={student.email} className="border-2 border-black p-1 outline-none placeholder:text-black w-[204px]" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-lg font-semibold">
                  Level
                </label>
                <Select onChange={(e) => setLevel(e.value)} styles={customStyles} options={options} placeholder="Select Student Level" />
              </div>
            </div>
            <h4 className="font-bold text-xl mb-4">Courses:</h4>
            <div className="flex flex-wrap gap-4 mb-6">
              {student.courses.map((course, index) => (
                <div className="text-white bg-[#575AA2] py-2 px-4 rounded-lg capitalize" key={index}>
                  {course.courseName}
                </div>
              ))}
              <div className="text-white bg-[#575AA2] py-2 px-4 rounded-lg capitalize">
                <i className="fa-solid fa-plus"></i>
              </div>
            </div>
            <h4 className="font-bold text-xl mb-4">Passed Courses:</h4>
            <div className="flex flex-wrap gap-4 mb-6">
              {student.passedCourses.map((course, index) => (
                <div className="text-white bg-[#575AA2] py-2 px-4 rounded-lg capitalize" key={index}>
                  {course}
                </div>
              ))}
              <div className="text-white bg-[#575AA2] py-2 px-4 rounded-lg capitalize">
                <i className="fa-solid fa-plus"></i>
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
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdateStudentModal;
