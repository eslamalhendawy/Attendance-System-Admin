import { Link } from "react-router-dom"

const UploadStudent = () => {
  return (
    <section className='grow flex flex-col justify-center items-center gap-12'>
      <Link to="/choose-students-file" className='bg-accent hover:bg-primary duration-200 py-8 w-[250px] text-white text-xl rounded-xl text-center'>Upload File</Link>
      <button className='bg-accent hover:bg-primary duration-200 py-8 w-[250px] text-white text-xl rounded-xl'>Add Single Student</button>
    </section>
  )
}

export default UploadStudent