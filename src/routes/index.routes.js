import { Router } from "express";
import routerUser  from "./user.routes.js";
const router = Router();
router.use("/users", routerUser);
export default router;