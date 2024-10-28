import React from "react";
import { useAuth } from "../../context/authContext";
import { FaUser } from "react-icons/fa"; // Optional: Importing an icon

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        {/* Optional Icon */}
        <FaUser className="text-black-500 text-xl mr-2" />
        <p className="text-xl font-semibold text-gray-800 tracking-wide">
          Welcome, {user.name}
        </p>
      </div>
      <div>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
