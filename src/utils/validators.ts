/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { z } from 'zod';
import Validator from './interfaces/validation-service';

type UserResponseModel = {
  _id: string;
  name: string;
  email: string;
  hashed_password: string;
};

export default class UserValidator implements Validator<UserResponseModel> {
  validate(body: unknown): UserResponseModel {
    const UserSchema = z.object({
      _id: z.string(),
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
      hashed_password: z.string(),
    });

    // define a schema for ID
    //  const HasID = z.object({ id: z.string() });

    //  // merge HasID with UserSchema
    //  const UserWithId = UserSchema.merge(HasID);
    //  export type UserSchema = z.infer<typeof UserSchema>;

    //  // infer User from UserWithId
    //  export type UserWithIdSchema = z.infer<typeof UserWithId>;

    //  export default {
    //    UserSchema,
    //  };

    const result: UserResponseModel = UserSchema.parse(body);

    return result;
  }
}
