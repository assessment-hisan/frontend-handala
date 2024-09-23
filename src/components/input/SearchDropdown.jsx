
import  { useState, useRef, useEffect } from "react";

const SearchDropdown = ({ options, onSelect, searchProperties, displayProperty }) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef();

  // Filter options based on the provided searchProperties (e.g., admission_number and name)
  const filteredOptions = options.filter(option => {
    return searchProperties.some(property => {
      const value = option[property];
      return value && String(value).toLowerCase().includes(search.toLowerCase());
    });
  });

  const handleSelect = (option) => {
    setSelected(option);
    setSearch(option[displayProperty]); // Update the search input to show the selected displayProperty
    onSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={`Search by ${searchProperties.join(' or ')}`} // Dynamically show the properties being searched
        className="p-2 border border-gray-300 rounded-md bg-gray-200 text-gray-700 w-full"
      />
      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md max-h-60 overflow-auto w-full">
          <ul className="list-none p-0">
            {filteredOptions.length === 0 ? (
              <li className="p-2 text-black">No results found</li>
            ) : (
              filteredOptions.map((option) => (
                <li
                  key={option[displayProperty]}
                  onClick={() => handleSelect(option)}
                  className="p-2 hover:bg-gray-200 cursor-pointer text-black"
                >
                  {`${searchProperties.map(prop => option[prop]).join(', ')}`} {/* Display both displayProperty and searchProperties */}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
