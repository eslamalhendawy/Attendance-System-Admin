import { useRef, useState } from "react";
import { postData } from "../apiRequest/Services";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import StudentsTable from "./StudentsTable";

const ChooseStudentsFiles = () => {
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("notSent");
  const [complete, setComplete] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [selected, setSelected] = useState("");
  const token = localStorage.getItem("adminID");

  const handleSend = async () => {
    if (!file) {
      toast.error("No file selected");
      return;
    }
    setSent(true);
    setLoading(true);
    const formData = new FormData();
    formData.append("studentsData", file);
    const response = await postData("admins/uploadStudentData", formData, token);
    if (response.status === "success" && response.message === "Some student records were incomplete and not added to the database. Please review the following records and ensure all required fields are provided") {
      setStatus("incomplete");
      let temp1 = response.data.incompleteStudents.map((student) => {
        return { index: student.studentId, name: student.name, email: student.email, level: student.level, passedCourses: student.passedCourses, password: student.password };
      });
      let temp2 = response.data.completeStudents.map((student) => {
        return { index: student.studentId, name: student.name, email: student.email, level: student.level, passedCourses: student.passedCourses, password: student.password };
      });
      setIncomplete(temp1);
      setComplete(temp2);
      toast.success("Data sent successfully");
    }
    if (response.status === "success" && response.message === "All student records were successfully added to the database") {
      setStatus("complete");
      let temp1 = response.data.completeStudents.map((student) => {
        return { index: student.studentId, name: student.name, email: student.email, level: student.level, passedCourses: student.passedCourses, password: student.password };
      });
      setComplete(temp1);
      toast.success("Data sent successfully");
    }
  };

  return (
    <section className="grow flex justify-center">
      <div className="mt-20 w-full">
        {status === "notSent" && (
          <>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-6">
              <p className="text-2xl">Choose File</p>
              <div onClick={() => fileInput.current.click()} className="bg-white border border-black px-2 py-3 md:w-[350px] text-center text-lg rounded-xl cursor-pointer">
                <button className="mr-[20px]  md:mr-[200px]">Choose File</button>
                <i className="fa-solid fa-angle-down"></i>
              </div>
              <input accept="application/json" onChange={(e) => setFile(e.target.files[0])} ref={fileInput} className="hidden" type="file" />
            </div>
            {file ? (
              <div className="flex justify-center items-center gap-4 mb-6">
                <p className="text-lg">Selected File:</p>
                <p className="text-lg font-semibold">{file.name}</p>
              </div>
            ) : (
              <p className="text-lg text-center mb-6">No file selected</p>
            )}
            <div className="mb-[250px] flex justify-center">
              <button disabled={loading} onClick={handleSend} className={`bg-accent hover:bg-primary duration-200 text-white px-12 py-2 text-xl rounded-xl ${loading && "bg-primary"}`}>
                {loading ? "Loading..." : "Send Data"}
              </button>
            </div>
          </>
        )}
        {status === "incomplete" && selected === "" && (
          <>
            <div className="bg-white lg:w-[60%] xl:w-[40%] mx-auto p-6 rounded-xl mb-12">
              <h2 className="text-[#B31111] text-center font-bold text-2xl mb-6">Warning</h2>
              <p className="text-center text-[#606060] text-lg  xl:mx-auto">Some student records were incomplete and not added to the system , please review the following records and ensure all required fields are provided.</p>
            </div>
            <div className="lg:w-[80%] xl:w-[70%] mx-auto flex justify-between">
              <button onClick={() => setSelected("accepted")} className="bg-accent hover:bg-primary duration-200 text-white py-2 w-[160px] text-lg rounded-lg">
                Stored Students
              </button>
              <button onClick={() => setSelected("rejected")} className="bg-accent hover:bg-primary duration-200 text-white py-2 w-[160px] text-lg rounded-lg">
                Rejected Students
              </button>
            </div>
          </>
        )}
        {status === "incomplete" && selected === "rejected" && (
          <>
            <div className="lg:w-[80%] xl:w-[70%] mx-auto flex justify-between mb-12">
              <button onClick={() => setSelected("accepted")} className="bg-accent hover:bg-primary duration-200 text-white py-2 w-[160px] text-lg rounded-lg">
                Stored Students
              </button>
              <button onClick={() => setSelected("rejected")} className="bg-accent hover:bg-primary duration-200 text-white py-2 w-[160px] text-lg rounded-lg">
                Rejected Students
              </button>
            </div>
            <h3 className="text-center font-medium text-[#0D181B] text-xl mb-12">Students Rejected</h3>
            <StudentsTable data={incomplete} />
          </>
        )}
        {status === "incomplete" && selected === "accepted" && (
          <>
            <div className="lg:w-[80%] xl:w-[70%] mx-auto flex justify-between mb-12">
              <button onClick={() => setSelected("accepted")} className="bg-accent hover:bg-primary duration-200 text-white py-2 w-[160px] text-lg rounded-lg">
                Stored Students
              </button>
              <button onClick={() => setSelected("rejected")} className="bg-accent hover:bg-primary duration-200 text-white py-2 w-[160px] text-lg rounded-lg">
                Rejected Students
              </button>
            </div>
            <h3 className="text-center font-medium text-[#0D181B] text-xl mb-12">Students Accepted</h3>
            <StudentsTable data={complete} />
          </>
        )}
        {status === "complete" && (
          <>
            <h2 className="text-center mb-6 font-medium text-[#606060] text-2xl">All student records were successfully added</h2>
            <h3 className="text-center font-medium text-[#0D181B] text-xl mb-12">Students Accepted</h3>
            <StudentsTable data={complete} />
          </>
        )}
        {!sent && (
          <ul className="list-disc text-[#606060] space-y-8 text-xl lg:w-[80%] xl:w-[70%] mx-auto">
            <li>File must be in JSON format.</li>
            <li>Each student record must contain Name, E-mail, Level, Passed course.</li>
          </ul>
        )}
      </div>
    </section>
  );
};

export default ChooseStudentsFiles;
