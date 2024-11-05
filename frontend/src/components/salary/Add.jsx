import React, { useEffect, useState } from 'react';
import { fetchDepartments, getEmployees } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Add = () => {
    const [salary, setSalary] = useState({
        employeeId: '',
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        payDate: null,
    });
    const [departments, setDepartments] = useState(null);
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        };
        getDepartments();
    }, []);

    const handleDepartment = async (e) => {
        const emps = await getEmployees(e.target.value);
        setEmployees(emps);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalary((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`https://employee-backend-gules.vercel.app/api/salary/add`, salary, {
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
            } else {
                console.error("Unexpected error:", error);
                alert("An error occurred while adding salary.");
            }
        }
    };

    return (
        <>
            {departments ? (
                <div className="max-w-4xl mx-auto mt-10 bg-white p-2 rounded-md shadow-lg mt-2">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add Salary</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>

                            {/* Department */}
                            <div>
                                <label className="block text-gray-700">Department</label>
                                <select
                                    name="department"
                                    onChange={handleDepartment}
                                    className="w-full px-4 py-2 border rounded-md"
                                    required
                                >
                                    <option value="">Select Department</option>
                                    {departments.map(dep => (
                                        <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Employee */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Employee</label>
                                <select
                                    name="employeeId"
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-md"
                                    required
                                >
                                    <option value="">Select Employee</option>
                                    {employees.map(emp => (
                                        <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Basic Salary */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Basic Salary</label>
                                <input
                                    type="number"
                                    name="basicSalary"
                                    onChange={handleChange}
                                    placeholder="Basic Salary"
                                    className="w-full px-4 py-2 border rounded-md"
                                    required
                                />
                            </div>

                            {/* Allowances */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Allowances</label>
                                <input
                                    type="number"
                                    name="allowances"
                                    onChange={handleChange}
                                    placeholder="Allowances"
                                    className="w-full px-4 py-2 border rounded-md"
                                    required
                                />
                            </div>

                            {/* Deductions */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Deductions</label>
                                <input
                                    type="number"
                                    name="deductions"
                                    onChange={handleChange}
                                    placeholder="Deductions"
                                    className="w-full px-4 py-2 border rounded-md"
                                    required
                                />
                            </div>

                            {/* Pay Date */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Pay Date</label>
                                <input
                                    type="date"
                                    name="payDate"
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-md"
                                    required
                                />
                            </div>

                        </div>
                        <button
                            type="submit"
                            className="w-full justify-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                            Add Salary
                        </button>
                    </form>
                </div>
            ) : <div>Loading...</div>}
        </>
    );
};

export default Add;
