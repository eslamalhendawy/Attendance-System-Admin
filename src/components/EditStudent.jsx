import { useState } from "react";

import DeleteStudentModal from "./DeleteStudentModal";
import UpdateStudentModal from "./UpdateStudentModal";

const EditStudent = () => {
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(true);

  const courses = ["course1", "course2", "course3", "course4"];
  const passedCourses = ["course1", "course2", "course3", "course4"];

  return (
    <section className="grow">
      <h1 className="capitalize text-3xl text-center mt-12 mb-12 underline">edit for student</h1>
      <div className="flex flex-col items-center justify-center gap-8 mb-20">
        <div className="flex items-center justify-center gap-8">
          <label htmlFor="email" className="font-[600] text-2xl">
            Student E-mail :
          </label>
          <input type="text" className="py-1 px-2 outline-none" placeholder="loerm487@gmail.com" />
        </div>
        <div className="flex justify-center">
          <button onClick={() => setFetched(!fetched)} className="bg-accent hover:bg-primary duration-300 text-white py-4 px-12 rounded-lg text-xl">
            Get student data
          </button>
        </div>
      </div>
      {fetched && (
        <>
          <div className="flex justify-center mb-12">
            <div className="">
              <p className="mb-3 font-bold text-lg">
                Name: <span className="font-[500]">Test Test</span>
              </p>
              <p className="mb-3 font-bold text-lg">
                Email: <span className="font-[500]">Test@Test.com</span>
              </p>
              <p className="font-bold text-lg">
                Level: <span className="font-[500]">4</span>
              </p>
            </div>
          </div>
          <h4 className="font-bold text-xl mb-8 w-[80%] mx-auto">Courses:</h4>
          <div className="flex gap-4 mb-8 w-[80%] mx-auto">
            {courses.map((course, index) => (
              <div className="text-white bg-[#575AA2] py-2 px-4 rounded-lg capitalize" key={index}>
                {course}
              </div>
            ))}
          </div>
          <h4 className="font-bold text-xl mb-8 w-[80%] mx-auto">Passed Courses:</h4>
          <div className="flex gap-4 mb-8 w-[80%] mx-auto">
            {passedCourses.map((course, index) => (
              <div className="text-white bg-[#575AA2] py-2 px-4 rounded-lg capitalize" key={index}>
                {course}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end mr-12 gap-8">
            <UpdateStudentModal />
            <DeleteStudentModal />
          </div>
        </>
      )}
    </section>
  );
};

export default EditStudent;
