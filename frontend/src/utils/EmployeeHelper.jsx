import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
    cell: (row) => <div className="px-2 py-1 text-base">{row.sno}</div>, // Set font size here
  },
  {
    name: "Name",
    selector: (row) => row.name,
    //width: "130px",
    sortable: true,
    center :"true",
    cell: (row) => <div className="px-2 py-1 text-base">{row.name}</div>, // Set font size here
  },
  {
    name: "Department",
    center :"true",
    selector: (row) => row.dep_name,
    cell: (row) => <div className="px-2 py-1 text-base">{row.dep_name}</div>, // Set font size here
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    center :"true",
    cell: (row) => <div className="px-2 py-1 text-base">{row.dob}</div>, // Set font size here
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center :"true",
    cell: (row) => <EmployeeButtons _id={row._id} />,
  },
];

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get("http://localhost:5000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }

  return departments;
};

export const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-2">
      <button
        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 text-base" // Increased font size
        onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
      >
        View
      </button>
      <button className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-200 text-base"
      onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)} >

        Edit
      </button>
      <button className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200 text-base">
        Salary
      </button>
      <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 text-base">
        Leave
      </button>
    </div>
  );
};
