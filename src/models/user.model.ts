import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,
        require:true,
    },
    email:{
        type: String,
        require: true,
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type: String,
        require:true,
    },
    age:{
        type:Number,
        require:true,
    },
    address:{
        type:String,
        require:true,
    }
})

export const userModel = mongoose.model("User", userSchema)