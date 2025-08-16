import zod from 'zod';

const loginSchema = zod.object({
    email: zod.string('email is required').email('Invalid email'),
    password: zod.string('password is required').min(8, 'password should be atleast 8 characters')
})

const registerSchema = zod.object({
    // name email password
    name: zod.string('name is required').nonempty('name is required'),
    email: zod.string('email is required').email('Invalid email'),
    password: zod.string('password is required').min(8, 'password should be atleast 8 characters')
})

export const schemas = {
    login: loginSchema,
    register: registerSchema
}