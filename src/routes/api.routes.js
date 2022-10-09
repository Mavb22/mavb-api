import { Router } from "express";
import routes from "./index.routes.js";
const router = Router();
router.use('/api', routes)
export default router;