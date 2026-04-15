import ApiError from "../../common/utils/api-error.js";
import { generateResetToken, generateAccessToken, verifyAccessToken, generateRefreshToken, verifyRefreshToken } from "../../common/utils/jwt-utils.js";
import { db } from "../../db/index.js";
import { usersTable } from "../../db/schema.js";
import { hashPassword, comparePassword } from "../../common/utils/bcrypt-utils.js";
import { eq } from "drizzle-orm";
import crypto from 'crypto'

const hashedToken = (token) => crypto.createHash('sha256').update(token).digest('hex')
class AuthService {
    async register({ name, email, password }) {
        const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, email));
        if (existingUser.length > 0) {
            throw new ApiError(400, "User already exists");
        }
        const hashedPassword = await hashPassword(password);
        const [user] = await db.insert(usersTable).values({
            name,
            email,
            password: hashedPassword
        }).returning({id: usersTable.id, name: usersTable.name, email: usersTable.email});
        
        return user;

    }

    async login({ email, password }) {
        const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
        if (!user) {
            throw ApiError.unauthorized("Invalid email or password");
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw ApiError.unauthorized("Invalid email or password");
        }
        const accessToken = generateAccessToken({ id: user.id, email: user.email });
        const refreshToken = generateRefreshToken({ id: user.id});
        const hashedRefreshToken = hashedToken(refreshToken)



        await db.update(usersTable).set({ refresh_token: hashedRefreshToken }).where(eq(usersTable.id, user.id));
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email
        };
        return {accessToken, refreshToken, user: userData};
    }

    async logout(userId) {
        await db.update(usersTable).set({ refresh_token: null }).where(eq(usersTable.id, userId));
    }
}
export default AuthService;

