import { useState, useEffect } from "react";
import { postData, updateData } from "../apiRequest/Services";

import Modal from "@mui/material/Modal";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateDoctorModal = ({ doctorEmail, setFetched, setEnteredEmail }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      setLoading(true);
      const response = await postData("doctors/getDoctorByEmail", { email: doctorEmail }, localStorage.getItem("adminID"));
      if (response.status === "success") {
        setId(response.data.doctor._id);
        setName(response.data.doctor.name);
        setEmail(response.data.doctor.email);
        setLoading(false);
      } else {
        toast.error("Failed to Fetch Doctor Data");
        setLoading(false);
      }
    };
    fetchDoctor();
  }, []);

  const handleUpdate = async () => {
    toast.info("Updating Doctor...");
    const response = await updateData(`doctors/${id}`, { name, email }, localStorage.getItem("adminID"));
    if (response.status === "success") {
      toast.success("Doctor Updated Successfully");
      setOpen(false);
      setEnteredEmail("");
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
                <h1 className="text-2xl text-center underline font-semibold mb-8">Doctor Update</h1>
                <div className="flex flex-col items-center gap-4 mb-8">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-lg font-semibold">
                      Name
                    </label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="border-2 border-black p-1 outline-none" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-lg font-semibold">
                      E-mail
                    </label>
                    <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border-2 border-black p-1 outline-none" />
                  </div>
                </div>
                {/* <h4 className="font-bold text-xl mb-4">Courses:</h4> */}
                {/* <div className="flex flex-wrap gap-4 mb-8">
              {doctor.courses.map((course, index) => (
                <div className="text-white bg-[#575AA2] py-2 px-4 rounded-lg capitalize" key={index}>
                  {course.courseName}
                </div>
              ))}
              <div className="text-white bg-[#575AA2] py-2 px-4 rounded-lg capitalize">
                <i className="fa-solid fa-plus"></i>
              </div>
            </div> */}
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

export default UpdateDoctorModal;
