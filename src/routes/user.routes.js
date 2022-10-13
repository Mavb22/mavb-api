import { Router } from "express";
// import  { Register, Confirm,
//           Login,
//           ChangePassword, 
//           ForgotPassword, 
//           UpdateDataUser,
//           UpdateImage, 
//           DeleteUser, 
//           GetUsers } 
//            from "../controllers/user.controller.js";

import {auth} from '../auth/auth.user.js';
import { GetUsers } from "../controllers/users/getusers.controler.js";
import { Register } from '../controllers/users/register.controller.js'
const router = Router();
// import {upload_image} from '../utils/save-storage.js';
router.get("/", GetUsers);
router.post("/register",Register);
// router.get("/confirm/:token", Confirm);
// router.post("/login", Login);
// router.put("/change-password/:userId",auth, ChangePassword);
// router.put("/forgot-password/:userId", ForgotPassword);
// router.put("/update-data/:userId", auth, UpdateDataUser);
// router.delete("/delete-user/:userId", auth, DeleteUser);
// router.put("/update-image/:userId",upload_image, UpdateImage);
export default router;