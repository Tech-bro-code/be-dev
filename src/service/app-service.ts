import bcrypt from "bcrypt"
import { AppRepository } from "../repository/app-repository";
import jwt from "jsonwebtoken"
import { Types } from "mongoose";


const jwtSecret = process.env.JWT_SECRET as string

export interface IAddUser {
    name: string,
    username: string,
    password: string,
    age: number,
    email: string,
}

export class AppServices {
    static getUserService = async () => {
    return await AppRepository.getUsers();
};

    static  addUserSevice = async (user : IAddUser) => {
    // if (!user.age || !user.name || !user.email || !user.password || !user.username) {
    //     throw new Error("All fields are required");
    // }
    // if(user.password.length <3 ){
    //     throw new Error("Password cannot be less than 3 characters")
    // }
    const isValid = await AppRepository.getUserEmail(user.email)
    if(isValid){
        throw new Error("email already exist")
    }
    //hash passsword
const hashPwd = await bcrypt.hash(user.password, 10)

    //find the last object in the db
    // const lastUser = AppRepository.getLastUser();
    //check the id then increment by 
    // const newId = lastUser.id + 1;
    //use the id for the next user
    const nextUser = {...user, password: hashPwd};
    return AppRepository.addUsers(nextUser)
};

    static getUserByIDService = async (id:string) => {
    if (!id) {
        throw new Error("id cannot be empty")
    }
//    else if (isNaN(Number(id))){
//         throw new Error("id must be a number")
    // } else if (!user.id){
    //     throw new Error("invalid id")
     
     const mongoId = new Types.ObjectId(id)
    const response = await AppRepository.getUserById(mongoId)
    return response;
};

 static deleteUserByIDService =async (id:string) => {
    if (!id) {
        throw new Error("input an ID to delete")
    }
    const convId = new Types.ObjectId(id);
    const response = await AppRepository.deleteUserByID(convId);
    return response;
};

    static dltByMail = async (email:string) => {
        if(!email){
            throw new Error("Input an email")
        }
        const response = await AppRepository.dltByEmail(email)
        return response;
    };

    static logIn = async (email: string, password:string) => {
    // if(!email || !password){
    //     throw new Error("Fields cannot be empty")
    // }if(!email.includes('@')){
    //     throw new Error("Invalid Email address")
    // }

    const user = await AppRepository.getUserEmail(email)

    if(!user){
        throw new Error('user not found')
    }

    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid){
        throw new Error("Invalid Password")
    }
const payload = {
    username:user.username,
    email:user.email
}
let jwtToken = jwt.sign(payload, jwtSecret, {expiresIn:"1m"})

    return {
        message:"Successfully Logged in",
        authkey:jwtToken,
    }
};

    static updateUserLocation = async(email:string, address:any) =>{
        const filter = {email}
        const update = {address}
      
        // if(!email.includes("@")){
        //     throw new Error("invalid email")
        // }
        const response = await AppRepository.updateUserLocation(filter, update)
          if(!response){
            throw new Error("Invalid user")
        }
        return response
    };

    static updateById = async(id:string,updateData:any) => {
        if(!id){
            throw new Error("id is null")
        }
        const convId = new Types.ObjectId(id)
        
        const response = AppRepository.updateById(convId, updateData)
        return response;


        }; 

        static updateOne = async (id:string, username:any) =>{
           const filter = {id:Types.ObjectId}
            const update = {username}
            // const convId = new Types.ObjectId(id)
            // if(!filter) return null
            const response = await AppRepository.updateOne(filter, update)
            return response;
        }

        static updateMany = async (update:any) =>{
           
             const response = await AppRepository.updateMany(update)
             return response;
        }
    
   

}
 