import { useRef, useState } from "react";
import Modal from "@mui/material/Modal";
import { updateData, postData } from "../apiRequest/Services";
import { useAppContext } from "../Context/AppContext";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangeAvatar = () => {
  const fileInput = useRef(null);
  const [newImage, setNewImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const adminID = localStorage.getItem("adminID");
  const { userData } = useAppContext();

  const handlePhotoChange = async () => {
    if (newImage === null) {
      toast.error("Please select a photo to upload");
      return;
    }
    toast.info("Updating profile photo, please wait...");
    const formData = new FormData();
    formData.append("adminProfilePicture", newImage);
    setLoading(true);
    if (userData.avatar) {
      const response = await updateData("admins/updateProfilePicture", formData, adminID);
      if(response.status === "success") {
        toast.success(response.message);
        setOpen(false);
        window.location.reload();
      } else {
        toast.error("Error updating profile photo, please try again");
      }
    } else {
      const response = await postData("admins/uploadProfilePicture", formData, adminID);
      if(response.status === "success") {
        toast.success(response.message);
        setOpen(false);
        window.location.reload();
      } else {
        toast.error("Error updating profile photo, please try again");
      }
    }
  };

  return (
    <>
      <div onClick={() => setOpen(true)} className="bg-white absolute right-0 bottom-[20px] text-xl text-accent hover:text-primary duration-200 size-[35px] rounded-full flex items-center justify-center cursor-pointer">
        <i className="fa-solid fa-pen"></i>
      </div>
      <input className="hidden" type="file" ref={fileInput} onChange={(e) => setNewImage(e.target.files[0])} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="bg-white p-6 sm:p-12 shadow shadow-white rounded-xl w-[300px] sm:w-[450px]">
            <div className="text-right mb-4">
              <i className="fa-solid fa-x text-xl text-[#d67a7a] hover:text-[#FF0000] duration-300 cursor-pointer" onClick={() => setOpen(false)}></i>
            </div>
            <h4 className="text-center mb-4 font-[400] text-3xl">Change Profile Photo</h4>
            <p className="text-center text-[#606060] mb-4">Choose New Photo</p>
            <div className="flex items-center justify-center mb-4">
              <button onClick={() => fileInput.current.click()} className="text-white bg-primary hover:bg-accent duration-200 py-2 px-12 rounded-lg font-semibold text-lg">
                Choose
              </button>
            </div>
            <div className="flex items-center justify-center">
              <button disabled={loading} onClick={handlePhotoChange} className={`text-white bg-primary hover:bg-accent duration-200 py-2 px-12 rounded-lg font-semibold text-lg ${loading && "bg-accent"}`}>
                {loading ? "Please Wait..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ChangeAvatar;
