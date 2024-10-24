import React from 'react'
import SummaryCard from './SummaryCard'
import {FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers} from 'react-icons/fa'
const AdminSummary = () => {
  return (
    <div className='p-6'>
      <h3 className='text-2xl font-bold text-gray-800 mt-3'>Workforce Analytics</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
        <SummaryCard icon = {<FaUsers/>} text="Total Employees" number={50} color="bg-teal-600"/>
        <SummaryCard icon = {<FaBuilding/>} text="Total Departments" number={10} color="bg-yellow-600"/>
        <SummaryCard icon = {<FaMoneyBillWave/>} text="Total Departments" number={10} color="bg-red-600"/>

      </div>
      <div className='mt-12'>
        <h4 className=' text-2xl font-bold text-gray-800 mt-3'>Absence Summary</h4>
          
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard icon={<FaFileAlt />} text="Leave Applied" number={5} color="bg-teal-600" />
          <SummaryCard icon={<FaCheckCircle />} text="Leave Approved" number={2} color="bg-green-600" />
          <SummaryCard icon={<FaHourglassHalf />} text="Leave Pending" number={4} color="bg-yellow-600" />
           <SummaryCard icon={<FaTimesCircle />} text="Leave Rejected" number={1} color="bg-red-600" />
  </div>
      </div>
    </div>
  )
}

export default AdminSummary

// import React from 'react';
// import SummaryCard from './SummaryCard';
// import { FaUsers } from 'react-icons/fa';

// const AdminSummary = () => {
//   return (
//     <div className="p-6 bg-white shadow-md rounded-lg">
//       <h3 className="text-2xl font-bold text-gray-800 mb-6">Workforce Analytics</h3>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <SummaryCard icon={<FaUsers className="text-blue-500 text-4xl"/>} text="Total Employees" number={50} />
//       </div>
//     </div>
//   );
// }

// export default AdminSummary;

