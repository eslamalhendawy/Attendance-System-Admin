import { useState } from "react";
import Modal from "@mui/material/Modal";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateDoctorModal = ({doctor}) => {
  const [open, setOpen] = useState(false);

  const handleUpdate = async () => {
    toast.info("Updating Student...");
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="bg-accent hover:bg-primary duration-300 text-white py-4 w-[150px] rounded-lg text-xl capitalize">
        update Data
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="bg-white p-6 w-[300px] sm:w-[550px]">
            <h1 className="text-2xl text-center underline font-semibold mb-8">Doctor Update</h1>
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-lg font-semibold">
                  Name
                </label>
                <input type="text" id="name" placeholder={doctor.name} className="border-2 border-black p-1 outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-lg font-semibold">
                  E-mail
                </label>
                <input type="text" id="name" placeholder={doctor.email} className="border-2 border-black p-1 outline-none" />
              </div>
            </div>
            <h4 className="font-bold text-xl mb-4">Courses:</h4>
            <div className="flex flex-wrap gap-4 mb-8">
              {doctor.courses.map((course, index) => (
                <div className="text-white bg-[#575AA2] py-2 px-4 rounded-lg capitalize" key={index}>
                  {course.courseName}
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
  )
}

export default UpdateDoctorModal