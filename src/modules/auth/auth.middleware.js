import { usersTable } from "../../db/schema.js";
import { db } from "../../db/index.js";
import { eq } from "drizzle-orm";
import ApiError from "../../common/utils/api-error.js";
import { verifyAccessToken } from "../../common/utils/jwt-utils.js";

export async function authenticationMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        throw ApiError.unauthorized("Unauthorized");
    }
    const decoded = verifyAccessToken(token);
    if (!decoded) {
        throw ApiError.unauthorized("Invalid token");
    }
    const user = await db.select().from(usersTable).where(eq(usersTable.id, decoded.id));
    
    
    if (!user) {
        throw ApiError.unauthorized("User no longer exists");
    }   
    console.log(user[0]);
    req.user = user[0]
    next();
}