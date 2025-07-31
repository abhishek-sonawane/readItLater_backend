import { client } from "../lib/prisma.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'

const verifyJWT = asyncHandler(async (req, res, next) => {
    // accessToken cookie from web & Authorization header from mobile 
    try {
        const token = req?.cookies?.accessToken || req?.header('Authorization')?.split(' ')[1]

        if (!token) {
            throw new ApiError(401, 'Unauthorized request!')
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await client.user.findFirst({
            where: {
                id: decodedToken.id
            }
        })
        if (!user) {
            throw new ApiError(401, 'Invalid access token')
        }
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, 'invalid access token')
    }

})

export { verifyJWT }