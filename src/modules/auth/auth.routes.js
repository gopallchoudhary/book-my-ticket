import validate from "../../common/middleware/validate.middleware.js";
import RegisterDto from "./dto/register.dto.js";
import LoginDto from "./dto/login.dto.js";
import { Router } from "express";
import AuthController from "./auth.controller.js";
import { authenticationMiddleware } from "./auth.middleware.js";
const authController = new AuthController();

const router = Router();

router.post("/register", validate(RegisterDto), authController.register);
router.post("/login", validate(LoginDto), authController.login);
router.get("/logout", authenticationMiddleware, authController.logout);




export default router;