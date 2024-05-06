import { useEffect, useState } from "react";
import { getData } from "../apiRequest/Services";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";

import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const SideMenu = () => {
  const [loading, setLoading] = useState(true);
  const { userData, setUserData } = useAppContext();
  const adminID = localStorage.getItem("adminID");
  const [open, setOpen] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getDoctorData = async () => {
      const response = await getData("admins/viewProfileForAdmin", adminID);
      setUserData({ ...userData, name: response.data.admin.name, email: response.data.admin.email, role: "admin", avatar: response.data.admin.profilePicture });
      setLoading(false);
    };
    getDoctorData();
  }, []);

  const handleLogout = async () => {
    await getData("admins/logout", adminID);
    setUserData({ ...userData, loggedIn: false });
    navigate("/");
    localStorage.removeItem("adminID");
  };

  return (
    <aside className="sideMenuHeight bg-primary sticky top-4 left-0 py-4 pl-4 px-8 rounded-lg flex flex-col gap-4 w-fit">
      <Link to="/profile" className="flex items-center gap-2">
        <div>{userData.avatar ? <img src={userData.avatar} className="size-[50px] rounded-full" /> : <div className="size-[50px] bg-accent rounded-full" />}</div>
        <h4 className="font-bold capitalize">{loading ? "Loading" : userData.name}</h4>
      </Link>
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <ul className="flex flex-col gap-4">
            <Link onClick={() => setOpen("")} to="/">
              <li className="hover:bg-white duration-200 p-2 rounded-lg cursor-pointer font-[600]">Home</li>
            </Link>
            <Collapse in={open === 1} timeout="auto" unmountOnExit>
              <ul>
                <Link to="/edit-student">
                  <li className="hover:bg-white duration-200 p-2 rounded-lg cursor-pointer">Edit</li>
                </Link>
                <Link to="/upload-student">
                  <li className="hover:bg-white duration-200 p-2 rounded-lg cursor-pointer">Upload Data</li>
                </Link>
              </ul>
            </Collapse>
            <li className="flex items-center justify-between hover:bg-white duration-200 p-2 rounded-lg cursor-pointer font-[600]" onClick={() => setOpen(open === 1 ? "" : 1)}>
              <span>Students</span>
              {open === 1 ? <ExpandLess /> : <ExpandMore />}
            </li>
            <Collapse in={open === 2} timeout="auto" unmountOnExit>
              <ul>
                <Link to="/edit-student">
                  <li className="hover:bg-white duration-200 p-2 rounded-lg cursor-pointer">Edit</li>
                </Link>
                <Link to="/upload-student">
                  <li className="hover:bg-white duration-200 p-2 rounded-lg cursor-pointer">Upload Data</li>
                </Link>
              </ul>
            </Collapse>
            <li className="flex items-center justify-between hover:bg-white duration-200 p-2 rounded-lg cursor-pointer font-[600]" onClick={() => setOpen(open === 2 ? "" : 2)}>
              <span>Doctors</span>
              {open === 2 ? <ExpandLess /> : <ExpandMore />}
            </li>
            <Collapse in={open === 3} timeout="auto" unmountOnExit>
              <ul>
                <Link to="/edit-student">
                  <li className="hover:bg-white duration-200 p-2 rounded-lg cursor-pointer">Edit</li>
                </Link>
                <Link to="/upload-student">
                  <li className="hover:bg-white duration-200 p-2 rounded-lg cursor-pointer">Upload Data</li>
                </Link>
              </ul>
            </Collapse>
            <li className="flex items-center justify-between hover:bg-white duration-200 p-2 rounded-lg cursor-pointer font-[600]" onClick={() => setOpen(open === 3 ? "" : 3)}>
              <span>Courses</span>
              {open === 3 ? <ExpandLess /> : <ExpandMore />}
            </li>
          </ul>
        </div>
        <button className="bg-white py-2 rounded-lg text-[#685BFF] hover:bg-[#685BFF] hover:text-white duration-200" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket mr-2"></i>Logout
        </button>
      </div>
    </aside>
  );
};

export default SideMenu;
