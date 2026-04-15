// import * as authService from "./auth.services.js";
import ApiResponse from "../../common/utils/api-response.js";
import AuthService from "./auth.services.js";

const authService = new AuthService();


class AuthController {
    async register(req, res) {
        const user = await authService.register(req.body)
        ApiResponse.created(res, "User registered successfully", user);
    }

    async login(req, res) {
        const { accessToken, refreshToken, user } = await authService.login(req.body);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })

        ApiResponse.ok(res, "Login successful", { accessToken, refreshToken, user });
    }

    async logout(req, res) {
        await authService.logout(req.user.id);
        res.clearCookie("refreshToken")
        ApiResponse.ok(res, "Logout successful");
    }

}

export default AuthController;

