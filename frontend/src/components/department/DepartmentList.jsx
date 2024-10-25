import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper'
const DepartmentList = () => {

  const[departments,setDepartments]=useState([])
  const[depLoading,setDepLoading]=useState(false)
  const[filteredDepartments,setfilteredDepartments]=useState([])
  const onDepartmentDelete = async(id)=>{
    const data =departments.filter(dep=>dep._id!==id)
    setDepartments(data)
  }

useEffect(()=>{
  const fetchDepartments=async()=>{
    setDepLoading(true)
    try{
       const response = await axios.get('http://localhost:5000/api/department',{
        headers:{
          "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
       })
       if(response.data.success){
        let sno=1;
        const data = await response.data.departments.map((dep)=>(
            {
              _id:dep._id,
              sno:sno++,
              dep_name:dep.dep_name,
              action:(<DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete}/>)
            }
          ))
          setDepartments(data);
          setfilteredDepartments(data)
       }
    }
    catch(error){
      if(error.response && !error.response.data.success){
         alert(error.response.data.error)
      }
    }
    finally{
      setDepLoading(false)
    }

  }
  fetchDepartments();
},[]);

const filterDepartments=(e)=>{
  const records = departments.filter((dep)=>
    dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setfilteredDepartments(records)
}

  return (
     <>{depLoading ? <div>Loading....</div> : 
     
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-800">Department Administration</h3>
      </div>
      <div className="flex items-center gap-4">
        <input
        onChange={filterDepartments}
          type="text"
          placeholder="Start typing department name..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Link
          to="/admin-dashboard/add-department"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 text-sm font-medium flex text-center"
        >
          Add Department
        </Link>
      </div>
      <div className='mt-5'>
        <DataTable
         columns={columns} data={filteredDepartments} pagination/>

      </div>
    </div>
    }</>
  )
}

export default DepartmentList