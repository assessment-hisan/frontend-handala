import { useState } from "react";
import SearchDropdown from "../input/SearchDropdown";
import axiosInstance from "../../utils/axiosInstance";

const IndProRegSection = ({ selectedProgram, Contestants }) => {
  const [participants, setParticipants] = useState(
    Array(selectedProgram.max_contestants).fill(null)
  );
  const [registeredNames, setRegisteredNames] = useState([]);
  const [error, setError] = useState(null);

  const handleSelect = (index, candidate) => {
    const newParticipants = [...participants];
    newParticipants[index] = candidate;
    setParticipants(newParticipants);
  };

  
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Filter out the null values before sending the request
    const validParticipants = participants.filter((p) => p !== null);
    if (validParticipants.length !== selectedProgram?.max_contestants) {
      setError("Please select all participants before registering.");
      return;
    }

    try {
      // Send POST request with the selected program and contestant IDs
       await axiosInstance.post("/register/individual", {
        programId: selectedProgram._id,
        contestants: [
          {
            team: participants[0]?.team,  // Assuming team data is available in the participants array
            contestantIds: participants.map(p => p?._id).filter(Boolean)  // Collecting contestant IDs
          }
        ]
      });

      // Assuming response is successful
      setRegisteredNames(validParticipants); // Store the registered participant details
      setError(null);
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        {selectedProgram.program_name}
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {participants.map((participant, index) => (
          <div key={index} className="flex flex-col mb-4">
            <label className="text-gray-600">Participant {index + 1}:</label>
            <SearchDropdown
              options={Contestants}
              onSelect={(option) => handleSelect(index, option)}
              searchProperties={["admission_number", "name"]}
              displayProperty="name"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Register
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {registeredNames.length > 0 && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md shadow-sm">
          <h3 className="text-xl font-semibold text-gray-700">
            Registered Participants:
          </h3>
          {registeredNames.map((participant, index) => (
            <p key={index} className="text-gray-800">
              Participant {index + 1}: {participant.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default IndProRegSection;
