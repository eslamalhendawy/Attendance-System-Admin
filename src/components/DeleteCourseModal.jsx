import { useState } from "react";
import { deleteData } from "../apiRequest/Services";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteCourseModal = ({course}) => {
  const [open, setOpen] = useState(false);
  const adminID = localStorage.getItem("adminID");
  const navigate = useNavigate();
  
  const handleDelete = async () => {
    toast.info("Deleting Course...");
    let response = await deleteData(`courses/${course._id}`, adminID);
    if(response === ""){
      navigate("/")
      toast.success("Course Deleted Successfully");
      localStorage.removeItem("editCourse");
    }
    else{
      toast.error("Failed to delete Course");
    }
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="bg-accent hover:bg-primary duration-300 text-white py-3 px-12 rounded-lg text-xl text-center">
        Delete
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="bg-white w-[300px] sm:w-[450px]">
            <h1 className="p-4 bg-[#C12121] text-white text-2xl font-bold mb-4">
              <i className="fa-solid fa-ban mr-4"></i>Delete Course
            </h1>
            <div className="flex items-center justify-center gap-4 mb-4">
              <button onClick={() => setOpen(false)} className="py-2 w-[100px] bg-[#D9D9D9] hover:bg-[#acaaaa] duration-200 rounded-lg font-bold">
                Cancel
              </button>
              <button onClick={handleDelete} className="py-2 w-[100px] bg-[#FF0000] hover:bg-[#C12121] duration-200 rounded-lg font-bold text-white">
                Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteCourseModal;
