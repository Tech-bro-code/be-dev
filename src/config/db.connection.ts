import mongoose from "mongoose";

export const mongoConnection = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/backend');  
        console.log("database is connected")
    } catch (error) {
        console.log(error)
        
    }



}