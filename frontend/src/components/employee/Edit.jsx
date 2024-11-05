import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const [employee, setEmployee] = useState(null);
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    console.log(employee)

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        };
        getDepartments();
    }, []);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                
                if (response.data.success && response.data.employee) {
                    setEmployee(response.data.employee);
                }
            } catch (error) {
                if (error.response && error.response.data && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        };
    
        fetchEmployee();
    }, [id]);
//    const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name in employee) {
//         // For top-level fields in employee
//         setEmployee((prevData) => ({ ...prevData, [name]: value }));
//     } else if (name in employee.userId) {
//         // For nested fields in userId
//         setEmployee((prevData) => ({
//             ...prevData,
//             userId: {
//                 ...prevData.userId,
//                 [name]: value,
//             },
//         }));
//     } else {
//         console.warn(`Field ${name} does not exist in employee or userId.`);
//     }
// };

// const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name in employee) {
//         // For top-level fields in employee
//         setEmployee((prevData) => ({ ...prevData, [name]: value }));
//     } else if (name in employee.userId) {
//         // For nested fields in userId
//         setEmployee((prevData) => ({
//             ...prevData,
//             userId: {
//                 ...prevData.userId,
//                 [name]: value,
//             },
//         }));
//     } else {
//         console.warn(`Field ${name} does not exist in employee or userId.`);
//     }
// };
// const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Check if employee is not null before accessing its properties
//     if (employee) {
//         if (name in employee) {
//             // For top-level fields in employee
//             setEmployee((prevData) => ({ ...prevData, [name]: value }));
//         } else if (employee.userId && name in employee.userId) {
//             // For nested fields in userId
//             setEmployee((prevData) => ({
//                 ...prevData,
//                 userId: {
//                     ...prevData.userId,
//                     [name]: value,
//                 },
//             }));
//         } else {
//             console.warn(`Field ${name} does not exist in employee or userId.`);
//         }
//     }
// };
const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({ ...prevData, [name]: value }));
};



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`https://employee-backend-gules.vercel.app/api/employee/${id}`, employee, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.success) {
                navigate("/admin-dashboard/employees");
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    return (
        <>
            {departments.length > 0 && employee ? (
                <div className="max-w-4xl mx-auto mt-10 bg-white p-2 rounded-md shadow-lg mt-2">
                    <h2 className="text-2xl font-semibold text-center mb-2">Edit Employee</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-1'>
                            {/* Name */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name" // matches the key in userId
                                    value={employee.userId.name || ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-md"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email" // matches the key in userId
                                    value={employee.userId.email || ''}
                                    onChange={handleChange}
                                    placeholder="Insert Email"
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
                                    value={employee.dob ? employee.dob.split("T")[0] : ''}
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
                                    value={employee.gender || ''}
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
                                    value={employee.maritalStatus || ''}
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
                                    value={employee.designation || ''}
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
                                    value={employee.department ? employee.department._id : ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-md"
                                    required
                                >
                                    <option value="">Select Department</option>
                                    {departments.map(dep => (
                                        <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Salary */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Salary</label>
                                <input
                                    type="number"
                                    name="salary"
                                    value={employee.salary || ''}
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
                                    value={employee.password || ''}
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
                                    value={employee.role || ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-md"
                                    required
                                >
                                    <option value="">Select Role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Employee">Employee</option>
                                </select>
                            </div>
                        </div>
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full justify-center bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                            Update Employee
                        </button>
                    </form>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};

export default Edit;
