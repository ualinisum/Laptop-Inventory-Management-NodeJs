import { NextFunction, Request, Response } from "express";
import { Laptop } from "../models/Laptop";
import { AppDataSource } from "../config/datasource";


export const getAllLaptops = async (req: Request ,res: Response, next: NextFunction) => {
    try {
        const laptopRep = AppDataSource.getRepository(Laptop);
        const laptops = await laptopRep.find();

        res.status(200).json(laptops);
    } catch (error) {
        console.log(error,"ERROR");
        next(error)
    }
}

export const addNewLaptop = async (req: Request, res: Response, next: NextFunction) => {
       try {
           const laptopRep = AppDataSource.getRepository(Laptop);
           const newLaptop = laptopRep.create(req.body);
           await laptopRep.save(newLaptop);
           res.status(200).json({ message: "Laptop added successfully" });
       } catch (error) {
            console.log(error,"ERROR");
            next(error)
       }
}

export const updateLaptop = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const laptopRep = AppDataSource.getRepository(Laptop);
        await laptopRep.update(id, req.body);
        res.status(200).json({ message: "Laptop updated successfully" });
    } catch (error) {
        console.log(error,"ERROR");
        next(error)
    }
    
}

export const deleteLaptop = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const laptopRep = AppDataSource.getRepository(Laptop);
        await laptopRep.delete(id);
        res.status(200).json({ message: "Successfully deleted Laptop" });
    } catch (error) {
        console.log(error,"ERROR");
        next(error)
    }
}