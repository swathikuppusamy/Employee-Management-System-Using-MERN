import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [departments,setDepartments]=useState([])
    const [formData,setFormData]=useState({})
    const navigate=useNavigate()
    useEffect(()=>{
       const getDepartments=async()=>{
        const departments=await fetchDepartments()
        setDepartments(departments)
       }
       getDepartments()
    },[])
//     const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     employeeId: '',
//     dob: '',
//     gender: '',
//     maritalStatus: '',
//     designation: '',
//     department: '',
//     salary: '',
//     password: '',
//     role: '',
//     image: null,
//   });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if(name==="image"){
        setFormData((prevData)=>({...prevData,[name]:files[0]}))
    }else{
        setFormData((prevData)=>({...prevData,[name]: value}))
    }
    
  };

  const handleSubmit = async(e) =>{
    e.preventDefault()
    const formDataObj=new FormData()
    Object.keys(formData).forEach((key)=>{
        formDataObj.append(key,formData[key])
    })
    try{
      const token = localStorage.getItem('token');
       //console.log("Token:", token); // Check the token in the console

      const response= await axios.post('http://localhost:5000/api/employee/add', formDataObj, {
        headers:{
            "Authorization" : `Bearer ${token}`
        }
       
      })
      if(response.data.success){
        navigate("/admin-dashboard/employees")
      }
    }catch(error){
         if(error.response && !error.response.data.success){
            alert(error.response.data.error)
         }
    }

}

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-2 rounded-md shadow-lg mt-2">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center ">Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-1'>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Insert Name"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Insert Email"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        {/* Employee ID */}
        <div className="mb-4">
          <label className="block text-gray-700">Employee ID</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="Employee ID"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Marital Status */}
        <div className="mb-4">
          <label className="block text-gray-700">Marital Status</label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          >
            <option value="">Select Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
        </div>

        {/* Designation */}
        <div className="mb-4">
          <label className="block text-gray-700">Designation</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Designation"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        {/* Department */}
        <div className="mb-4">
          <label className="block text-gray-700">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          >
            <option value="">Select Department</option>
            {departments.map(dep=>(
                <option key={dep._id}value={dep._id}>{dep.dep_name}</option>
            ))}
          </select>
        </div>

        {/* Salary */}
        <div className="mb-4">
          <label className="block text-gray-700">Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Salary"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Employee">Employee</option>
          </select>
        </div>

        {/* Upload Image */}
        <div className="mb-4">
          <label className="block text-gray-700">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full justify-center bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Employee
        </button>
        
      </form>
    </div>
  );
};

export default Add;