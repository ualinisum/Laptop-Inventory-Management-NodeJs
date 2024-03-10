import { Request, Response, NextFunction } from "express";

export const logger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();
  const clientIP = req.ip

  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.url} - Client IP: ${clientIP}`
  );

  res.on("finish", () => {
    const responseTime = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] Response ${res.statusCode} - ${responseTime}ms`
    );
  });

  next();
};
