import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import { postData } from "../apiRequest/Services";

import Modal from "@mui/material/Modal";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const { setUserData } = useAppContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const adminID = localStorage.getItem("adminID");

  const handleSubmit = async () => {
    if (currentPassword === "" || newPassword === "" || passwordConfirm === "") {
      toast.error("Please fill all the fields");
      return;
    }
    if (newPassword !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    toast.info("Changing password...");
    setLoading(true);
    const response = await postData("admins/changePasswordForAdmins", { currentPassword, newPassword, passwordConfirm }, adminID);
    if (response.status === "success") {
      toast.success(response.message);
      localStorage.removeItem("doctorID");
      setUserData({ loggedIn: false, name: "", email: "", avatar: "", role: "", id: "", courses: [] });
      navigate("/");
      setOpen(false);
      setLoading(false);
    } else {
      toast.error("Error changing password, please try again");
      setLoading(false);
    }
  }

  return (
    <>
      <div onClick={() => setOpen(true)} className="flex items-center justify-center">
        <button className="text-white bg-primary hover:bg-accent duration-200 py-2 px-12 rounded-lg font-semibold text-lg">Change Password</button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="bg-white p-6 sm:p-12 shadow shadow-white rounded-xl w-[300px] sm:w-[450px]">
            <div className="text-right mb-4">
              <i className="fa-solid fa-x text-xl text-[#d67a7a] hover:text-[#FF0000] duration-300 cursor-pointer" onClick={() => setOpen(false)}></i>
            </div>
            <h4 className="text-center mb-4 font-[400] text-3xl">Change Password</h4>
            <p className="text-center text-[#606060] mb-12">Please, enter your new password.</p>
            <div className="flex flex-col gap-8 mb-10">
              <input onChange={(e) => setCurrentPassword(e.target.value)} type="password" className="outline-none lg:text-lg border-b border-black pb-2" placeholder="Old Password" />
              <input onChange={(e) => setNewPassword(e.target.value)} type="password" className="outline-none lg:text-lg border-b border-black pb-2" placeholder="New Password" />
              <input onChange={(e) => setPasswordConfirm(e.target.value)} type="password" className="outline-none lg:text-lg border-b border-black pb-2" placeholder="Confirm New Password" />
            </div>
            <div className="flex justify-center">
              <button disabled={loading} onClick={handleSubmit} className={`bg-accent hover:bg-primary duration-200 text-center py-2 px-20 rounded-lg text-white ${loading && "bg-primary"}`}>{loading ? "Please Wait" : "Confirm"}</button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ChangePassword;
