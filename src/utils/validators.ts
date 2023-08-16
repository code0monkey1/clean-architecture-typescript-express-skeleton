/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { z } from 'zod';

export const UserSchema = z.object({
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
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(1, 'Password Cannot Be Empty')
    .max(20, 'Password cannot be more than 20 characters long'),
  created: z.date(),
  updated: z.date(),
});

// define a schema for ID
const HasID = z.object({ id: z.string() });

// merge HasID with UserSchema
const UserWithId = UserSchema.merge(HasID);
export type UserSchema = z.infer<typeof UserSchema>;

// infer User from UserWithId
export type UserWithIdSchema = z.infer<typeof UserWithId>;

export default {
  UserSchema,
};
