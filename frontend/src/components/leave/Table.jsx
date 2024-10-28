import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { columns } from '../../utils/LeaveHelper';
import axios from 'axios';
import { LeaveButtons } from '../../utils/LeaveHelper';

const Table = () => {
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves,setFilteredLeaves]=useState(null);

    const fetchLeaves = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/leave', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            console.log('Fetched Data:', response.data);

            if (response.data.success && response.data.leaves.length > 0) {
                let sno = 1;
                const data = response.data.leaves.map((leave) => ({
                    _id: leave._id,
                    sno: sno++,
                    employeeId: leave.employeeId.employeeId,
                    name: leave.employeeId.userId.name,
                    leaveType: leave.leaveType,
                    department: leave.employeeId.department.dep_name,
                    days: new Date(leave.endDate).getDate() - new Date(leave.startDate).getDate(),
                    status: leave.status,
                    action: <LeaveButtons Id={leave._id} />,
                }));

                console.log('Mapped Leaves Data:', data);
                setLeaves(data);
                setFilteredLeaves(data);
            } else {
                console.log('No leaves found or response unsuccessful');
            }
        } catch (error) {
            console.error('Error fetching leaves:', error);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

 const filterByInput=(e)=>{
    const data=leaves.filter((leave)=>leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()))
   setFilteredLeaves(data)
 }

 const filterByButton=(status)=>{
    //const data=leaves.filter(leave)=>leave.status.toLowerCase().includes.(status.toLowerCase()))
    const data=leaves.filter((leave)=>leave.status.toLowerCase().includes(status.toLowerCase()))

    setFilteredLeaves(data)
 }


    return (
        <div className="py-6">
            <div className=" p-4 bg-white rounded-lg shadow-md">
                <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Manage Leaves</h3>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
                    <input
                        type='text'
                        placeholder='Search By Employee ID'
                        className="w-full sm:w-2/3 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 sm:mb-0"
                        onChange={filterByInput}
                    />
                    <div className='flex space-x-3'>
                        <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300'
                        onClick={()=>filterByButton("Pending")}
                        >Pending</button>
                        <button className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-300'
                        onClick={()=>filterByButton("Approved")}
                        >Approved</button>
                        <button className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300'
                        onClick={()=>filterByButton("Rejected")}
                        >Rejected</button>
                    </div>
                </div>
                <div className='mt-3'>
                {filteredLeaves ? (
                    <DataTable columns={columns} data={filteredLeaves} pagination />
                ) : (
                    <div className="text-center text-gray-500">No data available</div>
                )}
                </div>
            </div>
        </div>
    );
};

export default Table;
