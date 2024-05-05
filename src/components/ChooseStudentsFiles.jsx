

const ChooseStudentsFiles = () => {
  return (
    <section className="grow flex justify-center">
      <div className="mt-20">
        <div className="flex items-center justify-center gap-12 mb-[250px]">
          <p className="text-2xl">Choose File</p>
          <div className="bg-white border border-black py-3 w-[350px] text-center text-lg rounded-xl cursor-pointer">
            <button className="mr-[200px]">Choose File</button>
            <i className="fa-solid fa-angle-down"></i>
          </div>
        </div>
        <ul className="list-disc text-[#606060] space-y-8 text-xl">
          <li>File must be in JSON format.</li>
          <li>Each student record must contain Name, E-mail, Level, Passed course.</li>
        </ul>
      </div>
    </section>
  );
};

export default ChooseStudentsFiles;
