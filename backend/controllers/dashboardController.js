import Employee from "../models/Employee.js";
import Department from "../models/Department.js";
import Salary from "../models/Salary.js";  // Ensure this import is here
import Leave from "../models/Leave.js";
import mongoose from 'mongoose';

const getSummary = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const totalDepartments = await Department.countDocuments();

    // Calculate total salary for the current month only
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const totalSalaries = await Salary.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $month: "$payDate" }, currentMonth + 1] }, // Adding 1 because months are 0-indexed
              { $eq: [{ $year: "$payDate" }, currentYear] }
            ]
          }
        }
      },
      {
        $group: {
          _id: "$employeeId",
          latestSalary: { $last: "$netSalary" }  // Get latest salary for each employee
        }
      },
      {
        $group: {
          _id: null,
          totalSalary: { $sum: "$latestSalary" }
        }
      }
    ]);
    const totalSalary = totalSalaries[0]?.totalSalary || 0;

    const employeeAppliedForLeave = await Leave.distinct("employeeId");

    const leaveStatus = await Leave.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const leaveSummary = {
      appliedFor: employeeAppliedForLeave.length,
      approved: leaveStatus.find((item) => item._id === "Approved")?.count || 0,
      rejected: leaveStatus.find((item) => item._id === "Rejected")?.count || 0,
      pending: leaveStatus.find((item) => item._id === "Pending")?.count || 0,
    };

    return res.status(200).json({
      success: true,
      totalEmployees,
      totalDepartments,
      totalSalary,
      leaveSummary,
    });
  } catch (error) {
    console.error("Error in getSummary:", error); // Logs detailed error for debugging
    return res.status(500).json({ success: false, error: "Dashboard summary error" });
  }
};

export { getSummary };
