import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUsers } from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-gray-200 w-64 min-h-screen p-6 flex flex-col">
      {/* Logo / Branding */}
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-white text-center">EmployeeHub</h3>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col space-y-6">
        <NavLink 
          to="/admin-dashboard" 
          className={({ isActive }) => isActive ? 'flex items-center p-3 bg-gray-700 rounded text-white text-lg' : 'flex items-center p-3 hover:bg-gray-700 rounded text-lg'} end>
          
          <FaTachometerAlt className="mr-4 text-xl" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink 
          to="/admin-dashboard/employees" 
          className={({ isActive }) => isActive ? 'flex items-center p-3 bg-gray-700 rounded text-white text-lg' : 'flex items-center p-3 hover:bg-gray-700 rounded text-lg'}>
          <FaUsers className="mr-4 text-xl" />
          <span>Employee</span>
        </NavLink>

        <NavLink 
          to="/admin-dashboard/departments" 
          className={({ isActive }) => isActive ? 'flex items-center p-3 bg-gray-700 rounded text-white text-lg' : 'flex items-center p-3 hover:bg-gray-700 rounded text-lg'}>
          <FaBuilding className="mr-4 text-xl" />
          <span>Department</span>
        </NavLink>

        <NavLink 
          to="/admin-dashboard/leaves" 
          className={({ isActive }) => isActive ? 'flex items-center p-3 bg-gray-700 rounded text-white text-lg' : 'flex items-center p-3 hover:bg-gray-700 rounded text-lg'}>
          <FaCalendarAlt className="mr-4 text-xl" />
          <span>Leave</span>
        </NavLink>

        <NavLink 
          to="/admin-dashboard/salary/add" 
          className={({ isActive }) => isActive ? 'flex items-center p-3 bg-gray-700 rounded text-white text-lg' : 'flex items-center p-3 hover:bg-gray-700 rounded text-lg'}>
          <FaMoneyBillWave className="mr-4 text-xl" />
          <span>Salary</span>
        </NavLink>

        <NavLink 
          to="/admin-dashboard/settings" 
          className={({ isActive }) => isActive ? 'flex items-center p-3 bg-gray-700 rounded text-white text-lg' : 'flex items-center p-3 hover:bg-gray-700 rounded text-lg'}>
          <FaCogs className="mr-4 text-xl" />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
