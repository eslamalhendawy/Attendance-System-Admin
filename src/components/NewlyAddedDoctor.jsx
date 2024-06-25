import { Link } from "react-router-dom";

const NewlyAddedDoctor = () => {
  const newDoctor = JSON.parse(localStorage.getItem("newDoctor"));
  return (
    <section className="grow">
      <h1 className="font-semibold text-2xl text-center mb-12">Doctor Data</h1>
      <p className="xl:w-[40%] mx-auto font-medium text-xl mb-6">Doctor Name: {newDoctor.name}</p>
      <p className="xl:w-[40%] mx-auto font-medium text-xl mb-6">Doctor ID: {newDoctor._id}</p>
      <p className="xl:w-[40%] mx-auto font-medium text-xl mb-6">Doctor Email: {newDoctor.email}</p>
      <p className="xl:w-[40%] mx-auto font-medium text-xl mb-6">Doctor Password: {newDoctor.password}</p>
      <div className="xl:w-[40%] mx-auto flex justify-between">
        <Link to="/" className="bg-accent hover:bg-primary duration-300 text-white py-4 px-12 rounded-lg text-xl">
          Done
        </Link>
        <Link to="/upload-doctor" className="bg-accent hover:bg-primary duration-300 text-white py-4 px-12 rounded-lg text-xl">
          Add Another Doctor
        </Link>
      </div>
    </section>
  );
};

export default NewlyAddedDoctor;
