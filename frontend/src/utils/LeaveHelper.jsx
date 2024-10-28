import { useNavigate } from "react-router-dom";
import React from 'react';

export const columns = [
    {
      name: "S No",
      selector: (row) => row.sno,
      width: "80px",
      //center:true,
      cell: (row) => <div className="px-2 py-1 text-sm">{row.sno}</div>,
    },
    {
      name: "Emp ID",
      selector: (row) => row.employeeId,
      width: "80px",
      center:true,
      cell: (row) => <div className="px-2 py-1 text-sm">{row.employeeId}</div>,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      //minWidth: "150px",
      sortable: true,
      center: true,
      cell: (row) => (
        <div className="px-2 py-1 text-sm" style={{ whiteSpace: "normal" }}>
          {row.name}
        </div>
      ),
    },
    {
      name: "Leave type",
      selector: (row) => row.leaveType,
      center : true,
     // width: "100px",
      cell: (row) => (
        <div className="px-2 py-1 text-sm" style={{ whiteSpace: "normal" }}>
          {row.leaveType}
        </div>
      ),
    },
    {
      name: "Department",
      selector: (row) => row.department,
      sortable: true,
      center : true,
     // minWidth: "150px",
      cell: (row) => (
        <div className="px-2 py-1 text-sm" style={{ whiteSpace: "normal" }}>
          {row.department}
        </div>
      ),
    },
    {
      name: "Days",
      selector: (row) => row.days,
      //width: "90px",
      center: true,
      cell: (row) => <div className="px-2 py-1 text-sm">{row.days}</div>,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      //width: "px",
      center : true,
      cell: (row) => (
        <div className="px-2 py-1 text-sm" style={{ whiteSpace: "normal" }}>
          {row.status}
        </div>
      ),
    },
    {
      name: "Action",
      selector: (row) => row.action,
      width: "100px",
      //center: true,
      cell: (row) => <LeaveButtons Id={row._id} />,
    },
];

// Button component for the "Action" column
export const LeaveButtons = ({ Id }) => {
    const navigate = useNavigate();

    const handleView = (id) => {
        navigate(`/admin-dashboard/leaves/${id}`);
    };

    return (
        <button
            className="px-4 py-1 bg-gray-600 rounded text-white hover:bg-gray-800"
            onClick={() => handleView(Id)}
        >
            View
        </button>
    );
};
