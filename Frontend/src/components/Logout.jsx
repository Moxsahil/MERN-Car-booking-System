import React from 'react'
import { useNavigate } from 'react-router-dom';
const Logout = () => {
  const navigate = useNavigate();

    const handleLogout = async () => {
        navigate("/user/logout");
      };
  return (
    <div className="absolute top-5 right-5 flex items-center z-50">
          <button
            onClick={handleLogout}
            className="flex items-center bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
          >
            <img
              src="https://www.svgrepo.com/show/529288/user-minus.svg"
              alt="Logout Icon"
              className="w-6 h-4 mr-2"
            />
            Logout
          </button>
        </div>
  )
}

export default Logout