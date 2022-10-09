import express from "express";
import { urlencoded } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./index.routes.js";
const app = express();
const corsOptions = {
    origin: "http://localhost:3500",
    credentials: true,
    optionsSuccessStatus: 200
};
dotenv.config();
app.set("name", process.env.APP_NAME);
app.set("port", process.env.PORT || 3500);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/upload", express.static("upload"));
app.use("/api",router);
export default app;
