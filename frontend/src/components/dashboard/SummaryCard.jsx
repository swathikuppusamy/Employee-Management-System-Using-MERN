import React from 'react';

const SummaryCard = ({ icon, text, number,color }) => {
  return (
    <div className="rounded flex bg-gray-100 p-8">
      {/* Icon */}
      <div className={`px-4 ${color} items-center text-3xl flex justify-center text-white rounded-full`}>
        {icon}
      </div>
      
      {/* Text and Number */}
      <div className="ml-4">
        <p className="text-lg font-medium ">{text}</p>
        <p className="text-3xl font-semibold ">{number}</p>
      </div>
    </div>
  );
}

export default SummaryCard;
