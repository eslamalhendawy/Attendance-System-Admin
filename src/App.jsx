import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAppContext } from "./Context/AppContext";
import { useEffect } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import ForgotPassword from "./components/ForgotPassword";
import OTP from "./components/OTP";
import ResetPassword from "./components/ResetPassword";
import SideMenu from "./components/SideMenu";
import Profile from "./components/Profile";
import UploadStudent from "./components/UploadStudent";
import ChooseStudentsFiles from "./components/ChooseStudentsFiles";
import EditStudent from "./components/EditStudent";
import AddSingleStudent from "./components/AddSingleStudent";
import UploadDoctor from "./components/UploadDoctor";
import EditDoctor from "./components/EditDoctor";
import NewlyAddedStudent from "./components/NewlyAddedStudent";
import NewlyAddedDoctor from "./components/NewlyAddedDoctor";
import UploadCourseData from "./components/UploadCourseData";
import NewCourseData from "./components/NewCourseData";
import AddCourseLectures from "./components/AddCourseLectures";
import GetCourse from "./components/GetCourse";
import EditCourse from "./components/EditCourse";

function App() {
  const loggedIn = Boolean(localStorage.getItem("adminID"));
  const { userData, setUserData } = useAppContext();

  useEffect(() => {
    if (loggedIn) {
      setUserData({ ...userData, loggedIn: true });
    }
  }, []);

  return (
    <>
      <Router>
        <Header />
        <div className={loggedIn ? "flex gap-[40px] p-6 bg-[#EEF5FF]" : ""}>
          {userData.loggedIn && <SideMenu />}
          <Routes>
            <Route path="/" element={userData.loggedIn ? <HomePage /> : <Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload-student" element={<UploadStudent />} />
            <Route path="/choose-students-file" element={<ChooseStudentsFiles />} />
            <Route path="/edit-student" element={<EditStudent />} />
            <Route path="/add-single-student" element={<AddSingleStudent />} />
            <Route path="/upload-doctor" element={<UploadDoctor />} />
            <Route path="/edit-doctor" element={<EditDoctor />} />
            <Route path="/new-student" element={<NewlyAddedStudent />} />
            <Route path="/new-doctor" element={<NewlyAddedDoctor />} />
            <Route path="/upload-course-data" element={<UploadCourseData />} />
            <Route path="/new-course-data" element={<NewCourseData />} />
            <Route path="/upload-lectures" element={<AddCourseLectures />} />
            <Route path="/get-course" element={<GetCourse />} />
            <Route path="/edit-course" element={<EditCourse />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer autoClose={2500} theme="dark" newestOnTop={true} />
    </>
  );
}

export default App;
