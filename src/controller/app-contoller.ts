import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import {AppServices } from "../service/app-service";



export class AppController {
    static  getUserController = async (req:any, res:Response) => {
    const response = await AppServices.getUserService();
    res.status(200).json({
        message:"Request Successful",
        data: response,
    })
};

     static addUserController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
     
        const response = await AppServices.addUserSevice(data);
        //send response to user
        res.status(200).json({
            message:"Request Successful",
            data:response
        })
    } catch (error:any) {
        res.status(400).json({
            message:"Bad Request",
            data: error.message,
        })
        
    }
};

 static  getUserByIdController = async(req: Request, res:Response) => {
    try {
        const id = req.params.userId
        const response = await AppServices.getUserByIDService(id);
        res.status(200).json({
            message:"Success",
            data:response
        })
    } catch (error:any) {
        res.status(400).json({
            message:"Bad Request",
            data: error.message
        })
        
    }
};

 static deleteUserByIDController = async (req:Request, res:Response) => {
    try {
        const id = req.params.deleteId
        const response = await AppServices.deleteUserByIDService(id)
        res.status(200).json({
            message: "Successully deleted user",
            data: response
        })

    } catch (error:any) {
        res.status(400).json({
            message:"Bad Request",
            data: error.message
        })
        
    }
};
static dltByMail = async (req:Request, res:Response) => {
    try {
        const {email} = req.body;
        const response = await AppServices.dltByMail(email);
        res.status(201).json({
            messsage:"User deleted",
            data:response,
        })
    } catch (error:any) {
        res.status(401).json({
            message:"Bad request",
            data:error.message
        })
    }


}

 static  loginController = async (req:Request, res:Response) => {
    try {
        const {email, password} = req.body;
        const response = await AppServices.logIn(email, password);
        res.status(200).json(response)
    } catch (error:any) {
        res.status(400).json({
            message: "Bad request",
            data: error.message
        })
        
    }
};

    static updateUserLocation = async(req:Request, res:Response) => {
        try {
            const{ email, address} = req.body;
            console.log("filter:", {email})
            console.log("Update", {address})
        
            const response = await AppServices.updateUserLocation(email, address)
            console.log(response)
            res.status(201).json({
                message:"Request Successful",
                data: response
            })
        } catch (error:any) {
            res.status(400).json({
                message:"Bad request",
                data:error.message
            })
            
        }
    };

    static updateById = async (req:Request, res: Response) =>{
        let {id} = req.params;
        const updataData = req.body;
        
        try {
           
            const response = await AppServices.updateById(id, updataData)
            res.status(201).json({
                message:"Request Accepted",
                data:response
            })
        } catch (error:any) {
            res.status(401).json({
                message:"Bad Response",
                data:error.message
            })
            
        }
    };

    static updateOne = async (req:Request, res:Response) =>{
        const {id} = req.params
        const {username}= req.body
        try {
        
        const response = await AppServices.updateOne(id, username)
        res.status(200).json({
            message:"Success",
            data:response
        })
        } catch (error:any) {
            res.status(400).json({
                message:"Bad Request",
                data:error.message
            })
            
        }
    };

     static updateMany = async(req:Request, res:Response)=>{
        try {
        
            const {update} = req.body
            const response = await AppServices.updateMany(update)
            res.status(200).json({
                message:"Sucess",
                data:response
            })
            
        } catch (error:any) {
            res.status(400).json({
                message:"Bad Request",
                data:error.message
            })
            
        }
     }

}




// export const sayHi = (req:any, res:Response) => {
//     res.status(200).json({
//         message:"This sis from our server"
//     });
// };

// export const users = (req:any, res:Response) => {
//     const people = [
//         {
//             name:"Musa",
//             age:30,
//             email:"musa@gmail.com"
//         },
//          {
//             name:"Ibrahim",
//             age:40,
//             email:"ibrahim@gmail.com"
//         }, {
//             name:"Yusuf",
//             age:20,
//             email:"yusuf@gmail.com"
//         },
//     ];
//     res.status(201).json({
//         message:"Request Successful",
//         data: people
//     })
// }