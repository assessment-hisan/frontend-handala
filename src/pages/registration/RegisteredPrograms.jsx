import Navbar from "../../components/ui/Navbar"


const RegisteredPrograms = () => {
  return (
    <div className="w-full h-screen bg-slate-100">
    <Navbar/>
      <div className="flex justify-center items-center gap-5 p-10">
        <input type="text" 
                className="input-box"
                />
        <div className="flex gap-5">
            <button className="btn-primary">Group</button>
            <button className="btn-primary">Individual</button>
        </div>
      </div>

      <div>
        <h1>program name</h1>
      </div>
    </div>
  )
}

export default RegisteredPrograms
