import { NextFunction, Request, Response } from "express";


export const logger = (req:Request, res:Response, next:NextFunction) => {
    console.warn(`This new Request was made by ${req.ip}, at ${new Date()}`)
    next();
}