/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from 'zod';

export const UserZodSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .trim()
    .min(1, 'Name cannot be empty'),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .trim()
    .min(1, 'Email cannot be empty')
    .email('Invalid email'),
  role: z.enum(['admin', 'customer', 'vendor'], {
    errorMap: (_issue, _ctx) => {
      return { message: 'Invalid role' };
    },
  }),
});

export default {
  UserZodSchema,
};
