import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';

const SummaryCard = () => {
    const { user } = useAuth();

    return (
        <div className="p-4">
            <div className="flex items-center bg-white p-5 rounded-lg shadow-md">
                {/* Icon */}
                <div className="flex justify-center items-center bg-teal-600 text-white rounded-full w-12 h-12">
                    <FaUser className="text-xl" />
                </div>

                {/* Text and Number */}
                <div className="ml-3">
                    <p className="text-lg font-medium text-gray-700">Welcome Back</p>
                    <p className="text-xl font-semibold text-gray-800">{user.name}</p>
                </div>
            </div>
        </div>
    );
};

export default SummaryCard;
