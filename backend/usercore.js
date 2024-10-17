import user from "./models/Users.js"
import bcrypt from 'bcrypt'
import connectdb from "./database/mongo.js";
const userRegister = async()=>{
    connectdb();
    try{
          
        const hashpass=await bcrypt.hash("admin",10);
        const newUser=new user ({
            name:"Admin",
            email:"admin@gmail.com",
            password:hashpass,
            role:"admin"
            
        })
        await newUser.save();
    }
    catch(error){
        console.log(error);
    }
}
userRegister();