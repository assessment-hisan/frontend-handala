import FilterSection from "../../components/input/FilterSection";
import Navbar from "../../components/ui/Navbar";
import IndProRegSection from "../../components/pro-reg-sections/IndProRegSection";
import GrpProRegSection from "../../components/pro-reg-sections/GrpProRegSection";
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const ContestantRegistration = () => {
  const navigate = useNavigate()
   
  const [userInfo, setUserInfo] = useState(null)
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [Contestants, setContestansts] = useState([]);
  const [Programs, setPrograms] = useState([]);

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/auth/get-user");
      if (response.data) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
      navigate("/");
    }
  };

  const getAllContestants = async () => {
    try {
      const response = await axiosInstance.get("/details/contestants");
      if (response.data && response.data) {
        setContestansts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPrograms = async () => {
    try {
      const response = await axiosInstance.get("/details/programs");
      if (response.data && response.data) {
        setPrograms(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllContestants();
    getAllPrograms();
    getUserInfo()
  }, []);

  return (
    <div className="w-full h-screen bg-slate-100">
      <Navbar userInfo={userInfo}/>
      <div className="pt-5 bg-slate-100 flex flex-col items-center pb-40">
        <FilterSection programs={Programs} onProgramSelect={setSelectedProgram} />

        {/* Show program registration sections based on selected program */}
        {selectedProgram && (
          selectedProgram.category === "individual" ? (
            <IndProRegSection
              key={selectedProgram._id}  
              selectedProgram={selectedProgram}
              Contestants={Contestants}
            />
          ) : (
            <GrpProRegSection
              key={selectedProgram._id} 
              selectedProgram={selectedProgram}
              Contestants={Contestants}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ContestantRegistration;
