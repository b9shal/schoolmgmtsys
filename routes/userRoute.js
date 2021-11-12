import { Router } from "express";
import { userLogin, userRegister } from "../controller/userController.js";
const router = Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);

export default router;