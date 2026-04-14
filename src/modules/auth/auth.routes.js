import validate from "../../common/middleware/validate.middleware.js";
import RegisterDto from "./dto/register.dto.js";
import { Router } from "express";
import AuthController from "./auth.controller.js";

const authController = new AuthController();

const router = Router();

router.post("/register", validate(RegisterDto), authController.register);
router.get("/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "hello world"
    })
})


export default router;