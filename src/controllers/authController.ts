import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/datasource";
import { HttpError } from "../models/HttpError";

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {username, password} = req.body;
        const userRep = AppDataSource.getRepository(User);
        const oldUser = await userRep.findOne({where: {username}})
        if(oldUser){
            throw new HttpError(400, "User already exists");
        }
        const encriptPass = await bcrypt.hash(password, 10);
        const newUser = userRep.create({
            username,
            password: encriptPass
        })
        await userRep.save(newUser);
        res.status(200).json({message: "Successfully Added User"})       
    } catch (error) {
        console.log(error,"ERROR");
        next(error);
    }

}

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {username, password} = req.body;
        const userRep = AppDataSource.getRepository(User);
        const user =  await  userRep.findOne({ where: { username } });
        if (!user){
            throw new HttpError(401, "Invalid User");
        }
        const isPasswordValid =  await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            throw new HttpError(401, "Invalid User");
        }
        const token = jwt.sign({id: user.id, username: user.username}, "secret", {expiresIn: "1h"})
        res.status(200).json({token})
    } catch (error) {
        console.log(error,"ERROR");
        next(error);
    }
}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userRep = AppDataSource.getRepository(User);
        const users =  await userRep.find();
        if (!users){
            throw new HttpError(401, "User Not Found");
        }
        res.status(200).json(users)
    } catch (error) {
        console.log(error,"ERROR");
        next(error);
    }
}