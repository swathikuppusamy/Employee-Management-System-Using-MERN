import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filterdEmployee,setFilteredEmployees]=useState([])

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get('https://employee-backend-gules.vercel.app/api/employee', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++, // Serial number increment
            dep_name: emp.department ? emp.department.dep_name : 'Not Assigned', // Handle null department
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(), // Format DOB
            action: <EmployeeButtons Id={emp._id} />, // Action buttons
          }));

          setEmployees(data);
          setFilteredEmployees(data)
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter=(e)=>{
    const records = employees.filter((emp)=>(
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setFilteredEmployees(records)
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-800">Employee Administration</h3>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Start typing employee name..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
         onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 text-sm font-medium flex text-center"
        >
          Add Employee
        </Link>
      </div>
      <div className='mt-6'>
        <DataTable
          columns={columns} 
          data={filterdEmployee} 
          progressPending={empLoading} 
          noDataComponent="No employees available" 
          pagination
        />
      </div>
    </div>
  );
};

export default List;
