import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
    const [department,setDepartment] = useState({
        dep_name: '',
        description: ''
    })

    const navigate=useNavigate()

    const handleChange=(e) =>{
        const {name,value}=e.target;
        setDepartment({...department,[name]:value})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
          const token = localStorage.getItem('token');
           //console.log("Token:", token); // Check the token in the console

          const response= await axios.post('https://employee-backend-gules.vercel.app/api/department/add', department, {
            headers:{
                "Authorization" : `Bearer ${token}`
            }
           
          })
          if(response.data.success){
            navigate("/admin-dashboard/departments")
          }
        }catch(error){
             if(error.response && !error.response.data.success){
                alert(error.response.data.error)
             }
        }

    }
    

  return (
    <div className="p-6 max-w-3xl mt-10 mx-auto bg-white rounded-lg shadow-md ">
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Add Department</h3>
        <form onSubmit={handleSubmit}>
          {/* Department Name Field */}
          <div className="mb-4">
            <label htmlFor="dep_name" className="block text-sm font-medium text-gray-700 mb-2">Department Name</label>
            <input
              type="text"
              name='dep_name'
              onChange={handleChange}
              placeholder="Enter Department Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Description Field */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 w-full font-medium text-sm"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddDepartment