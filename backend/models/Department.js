import mongoose from "mongoose";

const departmentSchema=new mongoose.Schema({
        dep_name: { type: String, required: true },
        description:{type:String},
        createdDate:{type:Date,default:Date.now},
        updatedDate:{type:Date,default:Date.now},
});
const Department = mongoose.model("Department",departmentSchema)
export default Department;