import { useState, useEffect } from "react";
import EditCourseModal from "./EditCourseModal";
import DeleteCourseModal from "./DeleteCourseModal";
import { postData, deleteData } from "../apiRequest/Services";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Table } from "antd";

import EditLectureModal from "./EditLectureModal";
import AddLectureModal from "./AddLectureModal";

const EditCourse = () => {
  const [lectures, setLectures] = useState([]);
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const courseCode = localStorage.getItem("courseCode");

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await postData(`courses/getCourseByCourseCode`, { courseCode }, localStorage.getItem("adminID"));
      if (response.status === "success") {
        setCourse(response.data.course);
        setLoading(false);
      }
    };
    fetchCourse();
  }, []);

  useEffect(() => {
    let tempLectures = [];
    if (!loading) {
      tempLectures = course.lectures.map((lecture) => {
        return { id: lecture._id, title: lecture.title, lectureNumber: lecture.lectureNumber };
      });
      setLectures(tempLectures);
    }
  }, [loading]);

  const deleteLecture = async (record) => {
    toast.info("Deleting lecture...");
    const response = await deleteData(`courses/deleteCourseLectures/${record.id}`, localStorage.getItem("adminID"));
    if (response === "") {
      window.location.reload();
    } else {
      toast.error("Failed to delete student");
    }
  };

  return (
    <section className="grow">
      <h1 className="font-semibold text-2xl text-center mb-12">Edit Course Data</h1>
      {loading && <p className="text-center text-2xl">Loading...</p>}
      {!loading && (
        <>
          <p className="xl:w-[40%] mx-auto font-medium text-xl mb-6">Course Name: {course.courseName}</p>
          <p className="xl:w-[40%] mx-auto font-medium text-xl mb-6">Course Code: {course.courseCode}</p>
          <p className="xl:w-[40%] mx-auto font-medium text-xl mb-6">Doctor: {course.doctorId.name}</p>
          <p className="xl:w-[40%] mx-auto font-medium text-xl mb-6">Prerequisites: </p>
          <div className="flex flex-wrap gap-4 mb-[100px] xl:w-[40%] mx-auto">
            {course.prerequisites.length !== 0 &&
              course.prerequisites.map((course, index) => (
                <div className="text-white bg-[#575AA2] py-2 px-4 rounded-lg capitalize" key={index}>
                  {course}
                </div>
              ))}
            {course.prerequisites.length === 0 && <p className="text-red-500 text-lg">No Prerequisites Found</p>}
          </div>
          <div className="w-[80%] xl:w-[40%] mx-auto flex justify-between mb-12">
            <DeleteCourseModal course={course} />
            <EditCourseModal course={course} />
          </div>
          {/* <div className="mb-8 flex justify-center">
            <button className="bg-accent hover:bg-primary duration-300 text-white py-3 px-12 rounded-lg text-xl text-center">Add Lecture</button>
          </div> */}
          <AddLectureModal course={course} />
          <Table className="capitalize" dataSource={lectures} pagination={false}>
            <Table.Column title="Title" dataIndex="title" key="title" />
            <Table.Column title="Lecture Number" dataIndex="lectureNumber" key="lectureNumber" />
            <Table.Column title="Edit" dataIndex="action" key="action" render={(_, record) => <EditLectureModal record={record} />} />
            <Table.Column
              title="Delete"
              dataIndex="action"
              key="action"
              render={(_, record) => (
                <button onClick={() => deleteLecture(record)} className="bg-accent hover:bg-primary duration-300 text-white py-1 px-2 rounded-lg text-sm text-center">
                  <i className="fa-solid fa-trash"></i>
                </button>
              )}
            />
          </Table>
        </>
      )}
    </section>
  );
};

export default EditCourse;
