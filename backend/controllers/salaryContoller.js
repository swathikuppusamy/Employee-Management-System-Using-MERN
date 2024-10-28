import Salary from "../models/Salary.js";
import Employee from '../models/Employee.js'
const addSalary = async (req, res) => {
    try {
        const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;
        const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);

        //console.log("Received data:", req.body);  // Log received data for debugging

        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary: totalSalary,
            payDate
        });

        await newSalary.save();
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error in addSalary:", error);  // Log error details
        return res.status(500).json({ success: false, error: "salary add server error" });
    }
};

// const getSalary = async(req,res) => {
//     try {
//         const { id } = req.params;
//         const salary = await Salary.find({ employeeId: id }).populate('employeeId', 'employeeId');
        
//        // console.log("Fetched salary records:", salary);  // Logging fetched records
        
//         return res.status(200).json({ success: true, salary });
//     } catch(error) {
//         console.error("Error in getSalary:", error);  // More detailed error logging
//         return res.status(500).json({ success: false, error: "salary get server error" });
//     }
// }

// const getSalary = async (req,res) =>{
//     try{
//         const {id,role} = req.params;
//         //console.log(role)
//         let salary 
//         if(role==="admin"){
//         salary = await Salary.find({employeeId : id}).populate('employeeId', 'employeeId')
//         }
//         else(!salary || salary.length < 1)
//         {
//             const employee = await Employee.findOne({userId: id})
//             salary = await Salary.find({employeeId: employee._id}).populate('employeeId', 'employeeId')
//         }
//         return res.status(200).json({success: true, salary})
//     }catch(error)
//     {
//         return res.status(500).json({success: false, error: "salary get server error"})
//     }
// }
const getSalary = async (req, res) => {
    try {
        const { id, role } = req.params;
        console.log("Received role:", role);  // Log role for debugging
        console.log("Received id:", id);  // Log id for debugging
        
        let salary;

        if (role === "admin") {
            // Find salary records by employeeId directly
            salary = await Salary.find({ employeeId: id }).populate('employeeId', 'employeeId');
        } else {
            // Find employee linked to the user ID, handle if employee not found
            const employee = await Employee.findOne({ userId: id });
            if (!employee) {
                return res.status(404).json({ success: false, error: "Employee not found" });
            }
            
            // Find salary records by employee's internal ID
            salary = await Salary.find({ employeeId: employee._id }).populate('employeeId', 'employeeId');
        }

        if (!salary || salary.length === 0) {
            return res.status(404).json({ success: false, error: "No salary records found" });
        }

        return res.status(200).json({ success: true, salary });
    } catch (error) {
        console.error("Error in getSalary:", error);  // Log the error for debugging
        return res.status(500).json({ success: false, error: "salary get server error" });
    }
};

export { addSalary,getSalary };
