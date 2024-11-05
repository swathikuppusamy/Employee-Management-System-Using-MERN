import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';

const List = () => {
    const { user } = useAuth(); // Check if user object is available
    const [leaves, setLeaves] = useState([]);
    let sno = 1;
    const { id } = useParams();

    // Check if user is loaded and console log their role
    useEffect(() => {
        console.log("User role:", user?.role);
        console.log("User ID:", user?._id);
    }, [user]);

    const fetchLeaves = async () => {
        if (!user) return; // Ensure user exists before fetching leaves
        try {
            const response = await axios.get(`https://employee-backend-gules.vercel.app/api/leave/${id}/${user.role}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.data.success) {
                setLeaves(response.data.leaves);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, [user]); // Fetch leaves only when user changes

    if (!leaves) {
        return <div>Loading...</div>
    }

    return (
        <div className='p-6 bg-gray-100 min-h-screen'>
            <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-gray-800">Manage Leaves</h3>
            </div>
            <div className="flex items-center gap-4 mb-6">
                <input 
                    type='text'
                    placeholder='Search By Department Name'
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {user?.role === "Employee" && (  // Only show button if user role is 'employee'
                    <Link
                        to="/employee-dashboard/add-leave"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 text-sm font-medium flex text-center"
                    >
                        Add New Leave
                    </Link>
                )}
            </div>
            <table className='min-w-full bg-white shadow-lg rounded-lg overflow-hidden'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
                    <tr>
                        <th className='px-6 py-3 text-left'>SNO</th>
                        <th className='px-6 py-3 text-left'>Leave Type</th>
                        <th className='px-6 py-3 text-left'>From</th>
                        <th className='px-6 py-3 text-left'>To</th>
                        <th className='px-6 py-3 text-left'>Description</th>
                        <th className='px-6 py-3 text-left'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leaves.length > 0 ? leaves.map((leave) => (
                        <tr key={leave._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                            <td className='px-6 py-4'>{sno++}</td>
                            <td className='px-6 py-4'>{leave.leaveType}</td>
                            <td className='px-6 py-4'>{new Date(leave.startDate).toLocaleDateString()}</td>
                            <td className='px-6 py-4'>{new Date(leave.endDate).toLocaleDateString()}</td>
                            <td className='px-6 py-4'>{leave.reason}</td>
                            <td className='px-6 py-4'>{leave.status}</td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="6" className='text-center py-4'>No leave records found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default List;
