import React from "react";

const AddSingleStudent = () => {
  return (
    <section className="grow">
      <h1 className="font-semibold text-2xl text-center mb-12">Student Data</h1>
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col gap-2 w-[30%]">
          <label htmlFor="name" className="font-semibold text-lg">Name :</label>
          <input className="py-2 px-1 rounded-lg" type="text" />
        </div>
        <div className="flex flex-col gap-2 w-[30%]">
          <label htmlFor="name" className="font-semibold text-lg">E-mail :</label>
          <input className="py-2 px-1 rounded-lg" type="text" />
        </div>
        <div className="flex flex-col gap-2 w-[30%]">
          <label htmlFor="name" className="font-semibold text-lg">Level :</label>
          <input className="py-2 px-1 rounded-lg" type="text" />
        </div>
        <div className="flex flex-col gap-2 w-[30%] mb-[100px]">
          <label htmlFor="name" className="font-semibold text-lg">Passed Course :</label>
          <input className="py-2 px-1 rounded-lg" type="text" />
        </div>
        <button className="bg-accent hover:bg-primary duration-300 text-white py-2 px-16 rounded-xl text-xl">Save</button>
      </div>
    </section>
  );
};

export default AddSingleStudent;
