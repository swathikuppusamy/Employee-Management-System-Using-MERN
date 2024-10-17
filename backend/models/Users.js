import mongoose from "mongoose";
 const UserSchema= new mongoose.Schema(
    {
        name:{type : String,require:true},
        email:{type : String,require:true},
        password:{type : String,require:true},
        role:{type : String,require:true,enum:["admin","employee"]},
        profilepicture:{type:String},
        createdDate:{type:Date,default:Date.now},
        updatedDate:{type:Date,default:Date.now},
    });
    const user= mongoose.model("user",UserSchema);
    export default user;
