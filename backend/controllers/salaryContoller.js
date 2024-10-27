import Salary from "../models/Salary.js";

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

const getSalary = async(req,res) => {
    try {
        const { id } = req.params;
        const salary = await Salary.find({ employeeId: id }).populate('employeeId', 'employeeId');
        
       // console.log("Fetched salary records:", salary);  // Logging fetched records
        
        return res.status(200).json({ success: true, salary });
    } catch(error) {
        console.error("Error in getSalary:", error);  // More detailed error logging
        return res.status(500).json({ success: false, error: "salary get server error" });
    }
}

export { addSalary,getSalary };
