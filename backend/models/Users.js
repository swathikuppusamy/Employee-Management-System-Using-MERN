import mongoose from "mongoose";
 const UserSchema= new mongoose.Schema(
    {
        name:{type : String,required:true},
        email:{type : String,required:true},
        password:{type : String,required:true},
        role:{type : String,enum:["Admin","Employee"],required:true},
        profilepicture:{type:String},
        createdDate:{type:Date,default:Date.now},
        updatedDate:{type:Date,default:Date.now},
    });
    const user= mongoose.model("user",UserSchema);
    export default user;
