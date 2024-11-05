import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate()
  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(`https://employee-backend-gules.vercel.app/api/leave/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(response.data);
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLeave();
  }, [id]);
  const changeStatus=async(id,status)=>{
    try {
      const response = await axios.put(`https://employee-backend-gules.vercel.app/api/leave/${id}`,{status}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data);
      if (response.data.success) {
        //setLeave(response.data.leave);
        navigate('/admin-dashboard/leaves')
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
  }
}

  if (loading) {
    return <div className="text-center text-lg text-gray-600">Loading...</div>;
  }

  if (!leave) {
    return <div className="text-center text-lg text-red-600">No employee found</div>;
  }

  return (
    <div className="p-8 mt-4 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <h2 className=" text-center text-2xl font-bold mb-4">Leave Details</h2>
      <div className="space-y-5">
        {/* Employee Name */}
        <div className="flex space-x-3 mb-5">
          <p className="text-lg font-bold">Name:</p>
          <p className="font-medium">{leave.employeeId.userId.name}</p>
        </div>

        {/* Employee ID */}
        <div className="flex space-x-3 mb-5">
          <p className="text-lg font-bold">Employee ID:</p>
          <p className="font-medium">{leave.employeeId.employeeId}</p>
        </div>

        {/* Date of Birth */}
        <div className="flex space-x-3 mb-5">
          <p className="text-lg font-bold">Leave Type</p>
          <p className="font-medium">
            {leave.leaveType}
          </p>
        </div>

        {/* Gender */}
        <div className="flex space-x-3 mb-5">
          <p className="text-lg font-bold">Reason</p>
          <p className="font-medium">{leave.reason}</p>
        </div>

        
        {/* Department */}
        <div className="flex space-x-3 mb-5">
          <p className="text-lg font-bold">Department:</p>
          <p className="font-medium">
            {leave.employeeId.department ? leave.employeeId.department.dep_name : 'Not Assigned'}
          </p>
        </div>

        {/* Start date */}
        <div className="flex space-x-3 mb-5">
          <p className="text-lg font-bold">Start Date:</p>
          <p className="font-medium">{new Date (leave.startDate).toLocaleDateString()}</p>
        </div>
   {/* end date */}
        <div className="flex space-x-3 mb-5">
          <p className="text-lg font-bold">End Date:</p>
          <p className="font-medium">{new Date (leave.endDate).toLocaleDateString()}</p>
        </div>
{/* Status */}
        <div className="flex space-x-3 mb-5">
          <p className="text-lg font-bold">
            {leave.status === "Pending" ? "Action:" : "Status:"}
          </p>
             {leave.status === "Pending" ? (
              <div className='flex space-x-2'>
                <button className='px-2 py-0.5 bg-teal-500 hover:bg-teal-700' 
                onClick={()=>changeStatus(leave._id,"Approved")}>Approve</button>
                <button className='px-2 py-0.5 bg-red-500 hover:bg-red-700'
                onClick={()=>changeStatus(leave._id,"Rejected")}>Reject</button>
              </div>
  
             ) :
          <p className="font-medium">{leave.status}</p>
        }
        </div>

        
      </div>
    </div>
  );
};

export default Detail;
