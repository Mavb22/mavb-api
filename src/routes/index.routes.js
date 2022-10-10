import { Router } from "express";
import routerUser  from "./user.routes.js";
const router = Router();
router.get("/", (req, res) => {
    res.json({msj:"Hello World! api " + process.env.APP_NAME});
});
router.use("/users", routerUser);
export default router;