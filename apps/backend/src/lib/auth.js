import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

// generate JWT token for user authentication

const generateAccessToken = async (payload) => {
    const token = jwt.sign(payload, 
        process.env.ACCESS_TOKEN_SECRET, 
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    )
    return token
}

const generateRefreshToken = async(payload)=>{
    const token = jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
    )
    return token
}

const hashPassword = async(password)=>{
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password,saltRounds)
    return hashedPassword
}

const verifyPassword = async(plainPassword,hashedPassword)=>{
    const result = await bcrypt.compare(plainPassword,hashedPassword)
    return result
}

export {generateAccessToken,generateRefreshToken,hashPassword,verifyPassword};