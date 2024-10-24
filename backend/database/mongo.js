
import mongoose from "mongoose";

const connectdb = async ()=>{
    try{
  
         await mongoose.connect(process.env.MONGODB_URL)
         console.log("Database connected successfully")
    }
    catch(error){
        console.log(error)
    }
}
export default connectdb