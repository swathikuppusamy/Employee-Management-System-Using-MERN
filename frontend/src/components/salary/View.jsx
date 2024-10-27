import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const View = () => {
    const [salaries, setSalaries] = useState([]); // Changed from null to empty array
    const [filteredSalaries, setFilteredSalaries] = useState([]); // Changed from null to empty array
    const { id } = useParams();
    let sno = 1;

    const fetchSalaries = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/salary/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(response.data);
            if (response.data.success) {
                setSalaries(response.data.salary);
                setFilteredSalaries(response.data.salary);
            }
        } catch (error) {
            if (error.response) {
                alert(`Error: ${error.response.data.message || error.message}`);
            } else {
                alert("An unexpected error occurred.");
            }
        }
    };

    useEffect(() => {
        fetchSalaries();
    }, []);

    const handleFilterSalaries = (e) => {
        const query = e.target.value;
        if (salaries) {
            const filteredRecords = salaries.filter((salary) =>
                salary.employeeId.employeeId.toLowerCase().includes(query.toLowerCase()) // Accessing nested employeeId
            );
            setFilteredSalaries(filteredRecords);
        }
    };

    return (
        <>
            {filteredSalaries.length === 0 ? ( // Check for empty array instead of null
                <div>Loading ...</div>
            ) : (
                <div className="overflow-x-auto p-5">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold my-3 mb-5">Salary History</h2>
                    </div>
                    {/* <div className="flex justify-end my-3">
                        <input
                            type="text"
                            placeholder="Search By Employee ID"
                            className="border px-2 rounded-md py-0.5 border-gray-300"
                            onChange={handleFilterSalaries}
                        />
                    </div> */}
                    {filteredSalaries.length > 0 ? (
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                                <tr>
                                    <th className="px-6 py-3">SNO</th>
                                    <th className="px-6 py-3">Emp ID</th>
                                    <th className="px-6 py-3">Salary</th>
                                    <th className="px-6 py-3">Allowance</th>
                                    <th className="px-6 py-3">Deduction</th>
                                    <th className="px-6 py-3">Total</th>
                                    <th className="px-6 py-3">Pay Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSalaries.map((salary) => (
                                    <tr
                                        key={salary._id} // Use _id as the key
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <td className="px-6 py-3">{sno++}</td>
                                        <td className="px-6 py-3">{salary.employeeId.employeeId}</td> {/* Accessing nested employeeId */}
                                        <td className="px-6 py-3">{salary.basicSalary}</td>
                                        <td className="px-6 py-3">{salary.allowances}</td>
                                        <td className="px-6 py-3">{salary.deductions}</td>
                                        <td className="px-6 py-3">{salary.netSalary}</td>
                                        <td className="px-6 py-3">
                                            {new Date(salary.payDate).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>No Records</div>
                    )}
                </div>
            )}
        </>
    );
};

export default View;
