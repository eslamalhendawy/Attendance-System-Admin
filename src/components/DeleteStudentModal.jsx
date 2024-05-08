import { useState } from "react";
import { deleteData } from "../apiRequest/Services";
import Modal from "@mui/material/Modal";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteStudentModal = ({student}) => {
  const [open, setOpen] = useState(false);
  const adminID = localStorage.getItem("adminID");

  const handleDelete = async () => {
    toast.info("Deleting Student...");
    let response = await deleteData(`students/${student._id}`, adminID);
    if(response === ""){
      window.location.reload();
    }
    else{
      toast.error("Failed to delete student");
    }
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="bg-accent hover:bg-[#652C40] duration-300 text-white py-4 w-[150px] rounded-lg text-xl capitalize">
        Delete Student
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="bg-white w-[300px] sm:w-[450px]">
            <h1 className="p-4 bg-[#C12121] text-white text-2xl font-bold mb-4"><i className="fa-solid fa-ban mr-4"></i>Delete Student</h1>
            <div className="flex items-center justify-center gap-4 mb-4">
              <button onClick={() => setOpen(false)} className="py-2 w-[100px] bg-[#D9D9D9] hover:bg-[#acaaaa] duration-200 rounded-lg font-bold">Cancel</button>
              <button onClick={handleDelete} className="py-2 w-[100px] bg-[#FF0000] hover:bg-[#C12121] duration-200 rounded-lg font-bold text-white">Delete</button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteStudentModal;
