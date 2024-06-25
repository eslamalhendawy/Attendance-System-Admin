import { Link } from "react-router-dom";



const NewCourseData = () => {
  const newCourse = JSON.parse(localStorage.getItem("newCourse"));
  return (
    <section className="grow">
      <h1 className="font-semibold text-2xl text-center mb-12">Upload Data For Courses</h1>
      <p className="xl:w-[40%] mx-auto font-medium text-xl mb-6">Course Name: {newCourse.courseName}</p>
      <p className="xl:w-[40%] mx-auto font-medium text-xl mb-6">Course Code: {newCourse.courseCode}</p>
      <p className="xl:w-[40%] mx-auto font-medium text-xl mb-6">Doctor: {newCourse.doctorId}</p>
      <p className="xl:w-[40%] mx-auto font-medium text-xl mb-6">Prerequisites: </p>
      <div className="flex flex-wrap gap-4 mb-[180px] xl:w-[40%] mx-auto">
        {newCourse.prerequisites.map((course, index) => (
          <div className="text-white bg-[#575AA2] py-2 px-4 rounded-lg capitalize" key={index}>
            {course}
          </div>
        ))}
        {newCourse.prerequisites.length === 0 && <p className="text-red-500 text-lg">No Courses Found</p>}
      </div>
      <div className="xl:w-[40%] mx-auto flex justify-center">
        <Link to="/upload-lectures" className="bg-accent hover:bg-primary duration-300 text-white py-4 px-12 rounded-lg text-xl w-[60%] text-center">
          Add Course Lectures
        </Link>
      </div>
    </section>
  );
};

export default NewCourseData;
