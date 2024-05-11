import { useState } from "react";
import { Link } from "react-router-dom";

const UploadDoctor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <section className="grow">
      <h1 className="capitalize text-3xl text-center mt-12 mb-24 underline">Enter doctor data</h1>
      <div className="flex flex-col items-center gap-8 mb-24">
        <div className="flex flex-col gap-2 w-[30%]">
          <label htmlFor="name" className="font-semibold text-lg">
           Doctor Name :
          </label>
          <input onChange={(e) => setName(e.target.value)} className="p-2 rounded-lg outline-none" type="text" id="name" />
        </div>
        <div className="flex flex-col gap-2 w-[30%]">
          <label htmlFor="email" className="font-semibold text-lg">
           Doctor Email :
          </label>
          <input onChange={(e) => setEmail(e.target.value)} className="p-2 rounded-lg outline-none" type="text" id="email" />
        </div>
      </div>
      <div className="w-[30%] mx-auto flex justify-between items-center gap-4">
        <Link className="bg-accent hover:bg-primary duration-300 text-white py-2 px-12 rounded-lg text-xl" to="/">Cancel</Link>
        <button className="bg-accent hover:bg-primary duration-300 text-white py-2 px-12 rounded-lg text-xl">Save</button>
      </div>
    </section>
  );
};

export default UploadDoctor;
