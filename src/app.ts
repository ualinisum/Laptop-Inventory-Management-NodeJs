import express from "express";
import authRoutes from "./routes/authRoutes";
import laptopRoutes from "./routes/laptopRoutes";
import { AppDataSource } from "./config/datasource";
import bodyParser from "body-parser";
import { logger } from "./middlewares/logger";
import morgan from "morgan";
import { customErrorHandlererrorHandler } from "./middlewares/customErrorHandler";

const app = express();
const PORT = 3000;

AppDataSource.initialize()
    .then(() => {
        app.use(bodyParser.json())
        app.use(morgan("combined"))
        app.use(logger)
        app.use("/api/auth", authRoutes)
        app.use("/api/laptops", laptopRoutes)
        app.use(customErrorHandlererrorHandler)

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => console.log(error, "ERROR"));