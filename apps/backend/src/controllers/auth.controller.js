import { generateAccessToken, generateRefreshToken, hashPassword, verifyPassword } from "../lib/auth.js"
import zod from 'zod'
import { client } from "../lib/prisma.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const loginSchema = zod.object({
    email: zod.string('email is required').email('Invalid email'),
    password: zod.string('password is required').min(8, 'password should be atleast 8 characters')
})

const registerSchema = zod.object({
    // naem email password
    name: zod.string('name is required'),
    email: zod.string('email is required').email('Invalid email'),
    password: zod.string('password is required').min(8, 'password should be atleast 8 characters')
})




const loginController = asyncHandler(async (req, res) => {
    // take out body and validate empty 
    if (!req.body) {
        throw new ApiError(400, 'JSON body is required')
    }
    // use zod to validate the body  
    const result = loginSchema.safeParse(req.body)
    if (!result.success) {
        throw new ApiError(400, result.error.issues.map(item => item.message).join(' & '))
    }
    const { email, password } = result.data

    // check if user exists in db
    const userExist = await client.user.findFirst({
        where: {
            email: email
        }
    })

    if (!userExist) {
        throw new ApiError(404, 'User does not exist')
    }
    // check the password with user
    const isPasswordMatch = await verifyPassword(password, userExist.hashedPassword)

    if (!isPasswordMatch) {
        console.log('isPasswordMatch', isPasswordMatch)
        throw new ApiError(401, 'Password is invalid')
    }
    // sign JWT and send 200
    const accessToken = await generateAccessToken({ id: userExist.id, email: userExist.email })
    const refreshToken = await generateRefreshToken({ id: userExist.id })

    const user = await client.user.update({
        where: {
            id: userExist.id
        },
        data: {
            refreshToken
        },
        select: {
            id: true,
            email: true,
            name: true
        }
    })

    const options = {
        httpOnly: true,
        secure: true
    }


    res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(new ApiResponse(200, "Login Successful", {
            user,
            accessToken,
            refreshToken
        }))
})

const registerController = asyncHandler(async (req, res) => {
    // take out the body and check empty
    if (!req.body) {
        throw new ApiError(400, 'JSON body is required')
    }
    // email name and password validate 
    const result = registerSchema.safeParse(req.body)
    if (!result.success) {
        throw new ApiError(400, result.error.issues.map(item => item.message).join(' & '))
    }
    const { name, email, password } = result.data

    // check if user exist 
    const userExist = await client.user.findFirst({
        where: {
            email: email
        }
    })

    if (userExist) {
        throw new ApiError(409, 'User already exists!')
    }
    const hashedPassword = await hashPassword(password)



    // create if it doesnt exist
    const user = await client.user.create({
        data: {
            name: name,
            email: email,
            hashedPassword: hashedPassword,
        },
        select: {
            id: true,
            name: true,
            email: true,
        }
    })
    // create tokens
    const accessToken = await generateAccessToken({ id: user.id, email: user.email })
    const refreshToken = await generateRefreshToken({ id: user.id })

    // update refresh token in DB
    const updatedUser = await client.user.update({
        where: {
            id: user.id
        }
        ,
        data: {
            refreshToken
        },
        select: {
            id: true,
            name: true,
            email: true,
        }
    })

    const options = {
        httpOnly: true,
        secure: true
    }


    res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(new ApiResponse(
            200,
            'User registered successfully!',
            {
                user,
                accessToken,
                refreshToken
            }
        ))
})


export {
    loginController,
    registerController
}