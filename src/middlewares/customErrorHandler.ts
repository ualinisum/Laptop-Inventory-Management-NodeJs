import { Request, Response, NextFunction } from "express";
import { HttpError } from "../models/HttpError";

export const customErrorHandlererrorHandler = (
  err: Error | HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let errorMessage = "Internal Server Error";

  if (err instanceof HttpError) {
    statusCode = err.statusCode;
    errorMessage = err.message;
  }
  res.status(statusCode).json({ message: errorMessage });
};
