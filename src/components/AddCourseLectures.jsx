import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postData, getData } from "../apiRequest/Services";

import { Table } from "antd";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCourseLectures = () => {
  const [title, setTitle] = useState("");
  const [lectureNumber, setLectureNumber] = useState("");
  const [lectures, setLectures] = useState([]);
  const [hidden, setHidden] = useState(false);
  const newCourse = JSON.parse(localStorage.getItem("newCourse"));

  const handleCancel = () => {
    setTitle("");
    setLectureNumber("");
  };
  const handleSave = async () => {
    if (title === "" || lectureNumber === "") {
      toast.error("Please fill all the fields");
      return;
    }
    toast.info("Adding lecture...");
    const response = await postData(`courses/addSingleLecture/${newCourse._id}`, { title, lectureNumber }, localStorage.getItem("adminID"));
    if (response.status === "success") {
      toast.success("Lecture added successfully");
      const temp = { title: response.data.lecture.title, lectureNumber: response.data.lecture.lectureNumber };
      setLectures([...lectures, temp]);
      setHidden(false);
      setTitle("");
      setLectureNumber("");
    } else {
      toast.error("Failed to add lecture");
    }
  };

  useEffect(() => {
    const fetchLectures = async () => {
      const response = await getData(`courses/${newCourse.id}`, localStorage.getItem("adminID"));
      if (response.status === "success") {
        const temp = response.data.course.lectures.map((lecture) => {
          return { title: lecture.title, lectureNumber: lecture.lectureNumber };
        });
        setLectures(temp);
      }
    };
    fetchLectures();
  }, [hidden]);

  return (
    <section className="grow">
      <h1 className="font-semibold text-2xl text-center mb-12">Upload Data For Courses</h1>
      <p className="w-[80%] xl:w-[40%] mx-auto font-medium text-xl mb-6 text-[#B31111] text-center">--&gt;The course must have 12 lecture for the year&lt;--</p>
      <p className="w-[80%] xl:w-[40%] mx-auto font-medium text-xl mb-6">Course Name: {newCourse.courseName}</p>
      <div className="flex flex-col items-center gap-8 mb-24">
        <div className="flex flex-col gap-2 w-[80%] xl:w-[40%]">
          <label htmlFor="title" className="font-semibold text-lg">
            Title :
          </label>
          <input onChange={(e) => setTitle(e.target.value)} value={title} className="p-2 rounded-lg outline-none" type="text" id="title" />
        </div>
        <div className="flex flex-col gap-2 w-[80%] xl:w-[40%]">
          <label htmlFor="number" className="font-semibold text-lg">
            Lecture Number :
          </label>
          <input onChange={(e) => setLectureNumber(e.target.value)} value={lectureNumber} className="p-2 rounded-lg outline-none" type="text" id="number" />
        </div>
      </div>
      <div className="w-[80%] xl:w-[40%] mx-auto flex justify-between mb-12">
        <button onClick={handleCancel} className="bg-accent hover:bg-primary duration-300 text-white py-3 px-12 rounded-lg text-xl text-center">
          Cancel
        </button>
        <button onClick={handleSave} className="bg-accent hover:bg-primary duration-300 text-white py-3 px-12 rounded-lg text-xl text-center">
          Save
        </button>
      </div>
      {/* <div className="w-[80%] xl:w-[40%] mx-auto flex justify-center">
        <Link to="/upload-lectures" className="bg-accent hover:bg-primary duration-300 text-white py-4 px-12 rounded-lg text-xl w-[60%] text-center">
          Add Course Lectures
        </Link>
      </div> */}
      {!hidden && (
        <Table className="capitalize" dataSource={lectures} pagination={false}>
          <Table.Column title="Title" dataIndex="title" key="title" />
          <Table.Column title="Lecture Number" dataIndex="lectureNumber" key="lectureNumber" />
        </Table>
      )}
    </section>
  );
};

export default AddCourseLectures;
