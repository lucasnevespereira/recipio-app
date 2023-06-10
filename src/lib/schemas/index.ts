import { z } from 'zod';

export const loginUserSchema = z.object({
    username: z
        .string({ required_error: 'Username or Email is required' }),
    password: z.string({ required_error: 'Password is required' })
});