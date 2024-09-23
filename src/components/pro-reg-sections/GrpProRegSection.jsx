
import  { useState, useEffect } from "react";
import axios from "axios";
import SearchDropdown from "../input/SearchDropdown";

const GrpProRegSection = ({ selectedProgram, Contestants }) => {
  const { max_groups, max_members_per_group, program_name } = selectedProgram;

  // State to store participants for each group
  const [groups, setGroups] = useState(
    Array(max_groups).fill().map(() => Array(max_members_per_group).fill(null))
  );

  const [registeredGroups, setRegisteredGroups] = useState([]);
  const [error, setError] = useState("");

  // State to toggle between groups
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

  // Handle selecting contestants for a particular group and member
  const handleSelect = (groupIndex, memberIndex, candidate) => {
    const newGroups = [...groups];
    newGroups[groupIndex][memberIndex] = candidate;
    setGroups(newGroups);
  };

  // Filter contestants for dropdown excluding those already selected in other groups
  const getAvailableContestants = (currentGroupIndex) => {
    const selectedInOtherGroups = new Set();
    groups.forEach((group, index) => {
      if (index !== currentGroupIndex) {
        group.forEach(member => {
          if (member) selectedInOtherGroups.add(member.admission_number);
        });
      }
    });
    return Contestants.filter(c => !selectedInOtherGroups.has(c.admission_number));
  };

  // Handle form submission for a particular group
  const handleSubmit = async (event, groupIndex) => {
    event.preventDefault();
    const group = groups[groupIndex];

    // Check for duplicates
    const hasDuplicate = group.some((member, i) => 
      group.slice(i + 1).some(m => m && m.admission_number === member.admission_number)
    );

    if (hasDuplicate) {
      setError(`Group ${groupIndex + 1} has duplicate members.`);
      return;
    }

    // Check if all members are selected
    if (group.includes(null)) {
      setError(`Please select all ${max_members_per_group} members for group ${groupIndex + 1}`);
    } else {
      setError("");
      // Save the group registration
      const newRegisteredGroups = [...registeredGroups];
      newRegisteredGroups[groupIndex] = group;
      setRegisteredGroups(newRegisteredGroups);
      
      // Send data to backend
      try {
        await axios.post('/api/register-group', {
          programId: selectedProgram.id,
          groupIndex,
          members: group
        });
        console.log("Group Submitted", group);
      } catch (error) {
        console.error("Error submitting group", error);
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full p-10 mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">{program_name}</h2>

      {/* Toggle Button for Groups */}
      <div className="mb-4">
        {Array.from({ length: max_groups }, (_, index) => (
          <button
            key={index}
            className={`mr-4 p-2 ${
              activeGroupIndex === index
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } rounded-md`}
            onClick={() => setActiveGroupIndex(index)}
          >
            Group {index + 1}
          </button>
        ))}
      </div>

      {/* Show active group form */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-600">
          Group {activeGroupIndex + 1}
        </h3>
        <form
          className="space-y-4"
          onSubmit={(e) => handleSubmit(e, activeGroupIndex)}
        >
          {groups[activeGroupIndex].map((member, memberIndex) => (
            <div key={memberIndex} className="flex flex-col mb-4">
              <label className="text-gray-600">
                Member {memberIndex + 1}:
              </label>
              <SearchDropdown
                options={getAvailableContestants(activeGroupIndex)}
                onSelect={(candidate) =>
                  handleSelect(activeGroupIndex, memberIndex, candidate)
                }
                searchProperties={["admission_number", "name"]}
                displayProperty="name"
              />
              
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Register Group {activeGroupIndex + 1}
          </button>
        </form>

        {/* Show error message if any */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Show registered participants for this group */}
        {registeredGroups[activeGroupIndex] && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700">
              Registered Participants for Group {activeGroupIndex + 1}:
            </h3>
            {registeredGroups[activeGroupIndex].map((participant, idx) => (
              <p key={idx} className="text-gray-800">
                Member {idx + 1}: {participant.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GrpProRegSection;
