import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Laptop } from "../models/Laptop";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, Laptop],
    synchronize: true,
    logging: false,
    subscribers: [],
    migrations: [],
})