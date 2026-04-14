import ApiError from "../../common/utils/api-error.js";
import { generateResetToken, generateAccessToken, verifyAccessToken, generateRefreshToken, verifyRefreshToken } from "../../common/utils/jwt-utils.js";

// const regiser = async ({name, email, password}) => {}

// export {regiser}

class AuthService {
    async register({ name, email, password }) {
        return {
            name,
            email,
            password
        }
    }


}
export default AuthService;

