import {z, ZodSchema} from 'zod';

export const loginUserSchema = z.object({
    username: z
        .string({required_error: 'Username or Email is required'}),
    password: z.string({required_error: 'Password is required'})
});

export const validateData = async (formData: FormData, schema: ZodSchema) => {
    const body = Object.fromEntries(formData);

    try {
        const data = schema.parse(body);
        return {
            formData: data,
            errors: null
        };
    } catch (err: any) {
        const errors = err?.flatten();
        return {
            formData: body,
            errors
        };
    }
};

export const registerUserSchema = z.object({
    username: z
        .string({required_error: 'Username is required'})
        .regex(/^[A-Za-z0-9_]+$/, {message: 'Username can only contain letters, numbers, and underscores'})
        .min(3, {message: 'Username must be at least 3 characters'})
        .max(24, {message: 'Username must be less than 24 characters'})
        .trim(),
    email: z
        .string({required_error: 'Email is required'})
        .email({message: 'Email must be a valid email'}),
    password: z
        .string({required_error: 'Password is required'})
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
            message:
                'Password must be a minimum of 8 characters and contain at least one letter, one number, and one special character.'
        }),
    passwordConfirm: z
        .string({required_error: 'Confirm Password is required'})
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
            message:
                'Password must be a minimum of 8 characters and contain at least one letter, one number, and one special character.'
        })
});