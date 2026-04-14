import jwt from 'jsonwebtoken';
import crypto from 'crypto';


const generateResetToken = () => {
    const rawToken = crypto.randomBytes(16).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    return {
        token: hashedToken,
        rawToken
    }
}

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })

}

const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
    })
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

export {
    generateResetToken,
    generateAccessToken,
    verifyAccessToken,
    generateRefreshToken,
    verifyRefreshToken
}