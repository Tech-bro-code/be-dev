import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"


export const authMiddleware = (req:Request, res:Response, next:NextFunction):any => {
    const authHeader = req.headers.authorization;
    const jwtSecret = process.env.JWT_SECRET as string
    const token = authHeader?.split("Bearer ")[1]
    if(!token) return res.sendStatus(401)

        jwt.verify(token, jwtSecret, (err, data) =>{
            if(err){
                return res.sendStatus(401);
            }
            next();
        })
 
}