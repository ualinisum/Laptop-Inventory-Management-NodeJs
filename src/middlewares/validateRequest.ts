import { Request, Response, NextFunction } from "express";
import Joi from "joi"


export const requestValidator = (schema: Joi.ObjectSchema) => {
    return (req: Request, res:Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if(error){
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return res.status(400).json({ message: errorMessage });
          }
        next();
        } 
    }