import { Link } from "react-router-dom";

const NewlyAddedStudent = () => {
  const newStudent = JSON.parse(localStorage.getItem("newStudent"));
  return (
    <section className="grow">
      <h1 className="font-semibold text-2xl text-center mb-12">Student Data</h1>
      <p className="xl:w-[40%] mx-auto font-medium text-xl mb-6">Student Name: {newStudent.name}</p>
      <p className="xl:w-[40%] mx-auto font-medium text-xl mb-6">Student ID: {newStudent._id}</p>
      <p className="xl:w-[40%] mx-auto font-medium text-xl mb-6">Student Email: {newStudent.email}</p>
      <p className="xl:w-[40%] mx-auto font-medium text-xl mb-6">Student Password: {newStudent.password}</p>
      <h4 className="xl:w-[40%] mx-auto font-medium text-xl mb-6">Current Courses: </h4>
      <div className="xl:w-[40%] mx-auto mb-6">
        {newStudent.courses.length === 0 ? (
          <p>No Courses Found</p>
        ) : (
          newStudent.courses.map((course) => (
            <div key={course} className="font-medium bg-[#575AA2] text-white text-center w-fit p-4 rounded-xl">
              {course}
            </div>
          ))
        )}
      </div>
      <h4 className="xl:w-[40%] mx-auto font-medium text-xl mb-2">Passed Courses: </h4>
      <div className="xl:w-[40%] mx-auto mb-6">
        {newStudent.passedCourses.length === 0 ? (
          <p>No Courses Found</p>
        ) : (
          newStudent.passedCourses.map((course) => (
            <div key={course} className="font-medium bg-[#575AA2] text-white text-center w-fit p-4 rounded-xl">
              {course}
            </div>
          ))
        )}
      </div>
      <div className="xl:w-[40%] mx-auto flex justify-between">
        <Link to="/" className="bg-accent hover:bg-primary duration-300 text-white py-4 px-12 rounded-lg text-xl">Done</Link>
        <Link to="/add-single-student" className="bg-accent hover:bg-primary duration-300 text-white py-4 px-12 rounded-lg text-xl">Add Another Student</Link>
      </div>
    </section>
  );
};

export default NewlyAddedStudent;
