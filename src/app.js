import dotenv from "dotenv";
import express from "express";
import { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import router from './routes/index.routes.js';
const app = express();
dotenv.config();
app.set("name", process.env.APP_NAME);
app.set("port", process.env.PORT || 3500);
app.use(cors());
app.use(bodyParser.json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/upload", express.static("upload"));

app.get("/", (req, res) => {
    res.json({msj:'Hola mundo'});
})
app.use("/api",router);
export default app; 