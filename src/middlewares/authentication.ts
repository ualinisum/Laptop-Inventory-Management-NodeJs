import { Request, Response, NextFunction } from "express";
import  jwt  from "jsonwebtoken";
import { HttpError } from "../models/HttpError";

export const authentication =  (req: Request, res:Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(" ")[1]

    if(!token){
        throw new HttpError(401,"UnAuthorized")
    }

    jwt.verify(token, "secret", (err, decoded) => {
        if(err){
            throw new HttpError(401,"UnAuthorized")
        }
        next();
    })

}