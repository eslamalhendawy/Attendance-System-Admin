import { useState, useEffect } from "react";
import { postData } from "../apiRequest/Services";

import Modal from "@mui/material/Modal";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddLectureModal = ({ course }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [lectureNumber, setLectureNumber] = useState("");

  useEffect(() => {
    console.log(course);
  }, []);

  const handleUpdate = async () => {
    if (title === "" || lectureNumber === "") {
      toast.error("Please fill all the fields");
      return;
    }
    toast.info("Adding Lecture...");
    const response = await postData(`courses/addSingleLecture/${course.id}`, { title, lectureNumber }, localStorage.getItem("adminID"));
    console.log(response);
    if (response.status === "success") {
      toast.success("Lecture Added Successfully");
      setOpen(false);
      window.location.reload();
    } else {
      toast.error("Failed to Added Lecture");
    }
  };
  return (
    <>
      <div onClick={() => setOpen(true)} className="mb-8 flex justify-center">
        <button className="bg-accent hover:bg-primary duration-300 text-white py-3 px-12 rounded-lg text-xl text-center">Add Lecture</button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="bg-white p-6 w-[300px] sm:w-[550px]">
            <h1 className="text-2xl text-center underline font-semibold mb-8">Add Lecture</h1>
            <div className="flex flex-col items-center gap-4 mb-16">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-lg font-semibold">
                  Lecture Title
                </label>
                <input type="text" id="name" value={title} onChange={(e) => setTitle(e.target.value)} className="border-2 border-black p-1 outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-lg font-semibold">
                  Lecture Number
                </label>
                <input type="text" id="email" value={lectureNumber} onChange={(e) => setLectureNumber(e.target.value)} className="border-2 border-black p-1 outline-none" />
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
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

export default AddLectureModal;
