import multer from "multer"
import Employee from "../models/Employee.js"
import User from "../models/Users.js"
import bcrypt from 'bcrypt'
import path from "path"

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})

const addEmployee=async(req,res)=>{
    try{

    
   const{
    name,
    email,
    employeeId,
    dob,
    gender,
    maritalStatus,
    designation,
    department,salary,password,role,
   }=req.body;

   const user = await User.findOne({email})
   if(user){
    return res.status(400).json({success: false,error:"User already registered as employee "})
   }
   const hashPassword=await bcrypt.hash(password,10)

   const newUser=new User({
    name,
    email,
    password:hashPassword,
    role,
    profileImage: req.file ? req.file.filename :""
   })
   const savedUser=await newUser.save()

   const newEmployee = new Employee({
    userId:savedUser._id,
    employeeId,
    dob,
    gender,
    maritalStatus,
    designation,
    department,
    salary
   })
   await newEmployee.save()
   return res.status(200).json({success:true,message:"Employee created"})
}catch(error){
    
    return res.status(500).json({success:false,error:"Server error in adding employee"})
}
}
const getEmployees=async(req,res)=>{
    try{
        const employees = await Employee.find().populate('userId',{password:0}).populate("department")
        return res.status(200).json({success:true,employees})
    }catch(error)
    {
        console.log(error.message)
        return res.status(500).json({success:false,error:"get employees server error"})

    }
}



export {addEmployee,upload,getEmployees}