import { useState } from 'react';
import Login from '../components/Login';

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-gray-300 flex items-center justify-between px-6 py-2 drop-shadow">
        <h2 className="text-xl font-medium text-black py-2">Handala</h2>
        <div
          className="flex bg-primary px-5 py-2 rounded-lg text-black cursor-pointer"
          onClick={handleModalOpen}
        >
          Login
        </div>
      </div>

      {/* Modal for Login */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleModalClose}
            >
              &times;
            </button>
            <Login />
          </div>
        </div>
      )}


<div className="flex flex-col items-center justify-center mt-16 ">
      <div className="">
      <img src="/Logo.png "className="w-[30rem]"alt="Hisan Image"/>
      </div>
      
    </div>
    </>
  );
};

export default Index;
