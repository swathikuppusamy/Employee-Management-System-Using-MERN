import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://employee-backend-gules.vercel.app/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(response.data);
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return <div className="text-center text-lg text-gray-600">Loading...</div>;
  }

  if (!employee) {
    return <div className="text-center text-lg text-red-600">No employee found</div>;
  }

  return (
    <div className="p-8 mt-4 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Employee Details</h2>
      <div className="space-y-5">
        {/* Employee Name */}
        <div className="flex space-x-3 mb-5">
          <p className="text-lg font-bold">Name:</p>
          <p className="font-medium">{employee.userId.name}</p>
        </div>

        {/* Employee ID */}
        <div className="flex space-x-3 mb-5">
          <p className="text-lg font-bold">Employee ID:</p>
          <p className="font-medium">{employee.employeeId}</p>
        </div>

        {/* Date of Birth */}
        <div className="flex space-x-3 mb-5">
          <p className="text-lg font-bold">Date of Birth:</p>
          <p className="font-medium">
            {new Date(employee.dob).toLocaleDateString()}
          </p>
        </div>

        {/* Gender */}
        <div className="flex space-x-3 mb-5">
          <p className="text-lg font-bold">Gender:</p>
          <p className="font-medium">{employee.gender}</p>
        </div>

        {/* Marital Status */}
        <div className="flex space-x-3 mb-5">
          <p className="text-lg font-bold">Marital Status:</p>
          <p className="font-medium">{employee.maritalStatus}</p>
        </div>

        {/* Designation */}
        <div className="flex space-x-3 mb-5">
          <p className="text-lg font-bold">Designation:</p>
          <p className="font-medium">{employee.designation}</p>
        </div>

        {/* Department */}
        <div className="flex space-x-3 mb-5">
          <p className="text-lg font-bold">Department:</p>
          <p className="font-medium">
            {employee.department ? employee.department.dep_name : 'Not Assigned'}
          </p>
        </div>

        {/* Salary */}
        <div className="flex space-x-3 mb-5">
          <p className="text-lg font-bold">Salary:</p>
          <p className="font-medium">${employee.salary}</p>
        </div>

        {/* Role */}
        <div className="flex space-x-3 mb-5">
          <p className="text-lg font-bold">Role:</p>
          <p className="font-medium">{employee.userId.role}</p>
        </div>
      </div>
    </div>
  );
};

export default View;
