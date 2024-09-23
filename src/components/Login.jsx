
import PasswordInput from "./input/PasswordInput"
import { validateEmail } from "../utils/helper"
import { useState } from "react"
import axiosInstance from "../utils/axiosInstance"
import { useNavigate } from "react-router-dom"

const Login =  () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }

    if(!password) {
      setError("please enter the password")
      return;
    }

    setError("")
    
    //login api call
    try {
      const response = await axiosInstance.post("/auth/login", {
        email: email,
        password:password
      })

      //Handle seccesfull login response
      if (response.data) {
          localStorage.setItem("token", response.data.accessToken)
          if (!response.data.isAdmin ) {
            navigate("/registration")
          }else {
            navigate("/admin")
          }
      }
    } catch (error) {
     
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      }else {
        setError("An unexpected error occured. Please try again")
      }
    }

  }
  
  return (
    <>
    
      <div className="w-96 border rounded bg-white px-7 py-8">
        <form onSubmit={handleLogin}>
          <h4 className="text-2xl mb-7">Login</h4>
          <input type="text"
                 placeholder="Email" 
                 className="input-box"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)} />

          <PasswordInput 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

          <button type="submit" className="btn-primary" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
   
    </>
  )
}

export default Login
