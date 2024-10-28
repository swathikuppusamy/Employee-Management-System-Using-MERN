import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../../context/authContext';

const Setting = () => {
   const navigate = useNavigate();
   const { user } = useAuth();
   const [setting, setSetting] = useState({
      userId: user._id,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
   });
   const [error, setError] = useState(null);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setSetting({ ...setting, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (setting.newPassword !== setting.confirmPassword) {
         setError("Passwords do not match");
      } else {
         try {
            const response = await axios.put(
               "http://localhost:5000/api/setting/change-password",
               setting,
               {
                  headers: {
                     Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
               }
            );
            if (response.data.success) {
               navigate("/admin-dashboard/employees");
               setError("");
            }
         } catch (error) {
            if (error.response && !error.response.data.success) {
               setError(error.response.data.error);
            }
         }
      }
   };

   return (
      <div className="max-w-lg mx-auto mt-16 p-8 bg-gray-50 rounded-lg shadow-lg">
         <h2 className="text-3xl font-semibold text-gray-800 mb-6">Change Password</h2>
         {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
         <form onSubmit={handleSubmit}>
            <div className="mb-4">
               <label className="block text-sm font-medium text-gray-700 mb-2">Old Password</label>
               <input
                  type="password"
                  name="oldPassword"
                  placeholder="Enter old password"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                  required
               />
            </div>
            <div className="mb-4">
               <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
               <input
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                  required
               />
            </div>
            <div className="mb-4">
               <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
               <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                  required
               />
            </div>
            <button
               type="submit"
               className="w-full py-3 mt-6 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out">
               Change Password
            </button>
         </form>
      </div>
   );
};

export default Setting;
