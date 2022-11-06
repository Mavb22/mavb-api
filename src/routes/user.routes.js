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
import { GetUsers } from '../controllers/users/getusers.controler.js';
import { Register } from '../controllers/users/register.controller.js';
import {Confirm} from '../controllers/users/confirm-email.controller.js';
import {Login} from '../controllers/users/login.controller.js'
import { ChangePassword } from "../controllers/users/change-password.controller.js";
import {auth} from '../auth/auth.user.js';
const router = Router();
// import {upload_image} from '../utils/save-storage.js';
router.post("/register",Register);
router.get("/confirm/:token", Confirm);
router.post("/login", Login);
router.get("/",auth, GetUsers);
router.put("/change-password/:userId",auth, ChangePassword);


// router.post("/forgot-password", ForgotPassword);
// router.get("/confirm-email/:token",ConfirmEmail);
// router.post("reset-password/:token",ResetPassword);
// router.put("/update-data/:userId", auth, UpdateDataUser);
// router.delete("/delete-user/:userId", auth, DeleteUser);
// router.put("/update-image/:userId",upload_image, UpdateImage);
export default router;