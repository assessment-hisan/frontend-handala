
import './App.css'
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
// import Home from './pages/Home/Home'
import Index from './pages/Index'
import ContestantRegistration from './pages/registration/ContestantRegistration';
import RegisteredPrograms from './pages/registration/RegisteredPrograms';


function App() {
  const isAuthenticated = () => {
    return !!localStorage.getItem("token"); // Returns true if token exists
  };
  
  console.log(isAuthenticated())
  return (
   <Router>
      <Routes>
        <Route path="/" element={isAuthenticated() ? <ContestantRegistration/> : <Index/>}/>
        <Route path='/registration' element={<ContestantRegistration/>} />
        <Route path='/registered' element={<RegisteredPrograms/>} />
       </Routes>
    </Router>
  )
}

export default App
