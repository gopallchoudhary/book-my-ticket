// import * as authService from "./auth.services.js";
import ApiResponse from "../../common/utils/api-response.js";
import AuthService from "./auth.services.js";

const authService = new AuthService();


// const register = async (req, res) => {
//     const user = await authService.regiser(req.body);
//     ApiResponse.created(res, "User registered successfully", user);
// }

// export { register }\


class AuthController {
    async register(req, res) {
        const user = await authService.register(req.body)
        ApiResponse.created(res, "User registered successfully", user);
    }

}

export default AuthController;

