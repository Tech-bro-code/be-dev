import { Types } from "mongoose";
// import { dbUsers } from "../db/db.databse";
import { userModel } from "../models/user.model";


export interface Iuser {
    
    name: string,
    username: string,
    password: string,
    age: number,
    email: string,
}

 export class AppRepository {
     static  getUsers = async () => {
    const user = await userModel.find().select("-password -__v -age")
    return user;
};

    static addUsers = async (user: Iuser) => {
       const users = await userModel.create(user)
        return users; 
};

    static getUserById = async (id: Types.ObjectId) => {
   
    const user = await userModel.findById(id)
     if (!user){
        throw new Error("User does not exist")
    }
    return user;
};

    static deleteUserByID = async (id: Types.ObjectId) => {
    const response = await userModel.findByIdAndDelete(id)
    return response;
;}

    static dltByEmail = async (email:string) => {
        // if(!email.includes("@")){
        //     throw new Error("Invalid email address")
        // }
    const response = await userModel.findOneAndDelete({email})
    if(!response){
        throw new Error("email does not exist")

    }
    
        
   
    
    return `${response.name} has been deleted`;
};

  static getUserEmail = async (email:string):Promise<any> => {
    const response = await userModel.findOne({email})
    // if (!response){
    //     return null
    // }
    return response
  };
  static updateUserLocation = async (filter:any, update:any) => {
    const response = await userModel.findOneAndUpdate(filter, update, {new:true})
    return response;
  };

  static updateById = async(id: Types.ObjectId, updateData:any) =>{
    const response = await userModel.findByIdAndUpdate(id, updateData, {new:true})
    return response
  };

  static updateOne = async (filter:any, update:any) =>{
    const response = await userModel.updateOne(filter, update, {new:true});
    return response;
  };
  static updateMany = async (update:any) => {
    const response = await userModel.updateMany({},update,{new:true})
    return response;
  }


 }