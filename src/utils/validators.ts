// /* eslint-disable @typescript-eslint/no-unsafe-call */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */

// import { z } from 'zod';
// import Validator from './interfaces/validation-service';

type UserResponseModel = {
  _id: string;
  name: string;
  email: string;
  hashed_password: string;
};

// interface ValidationLibrary<T> {
//   validate(body: unknown): T | Error;
// }

// class ZodValidation implements ValidationLibrary<UserResponseModel> {
//   validate(body: unknown): UserResponseModel | Error {
//     const UserSchema = z.object({
//       _id: z.string(),
//       name: z
//         .string({
//           required_error: 'Name is required',
//         })
//         .trim()
//         .min(1, 'Name cannot be empty'),
//       email: z
//         .string({
//           required_error: 'Email is required',
//         })
//         .trim()
//         .min(1, 'Email cannot be empty')
//         .email('Invalid email'),
//       hashed_password: z.string(),
//     });

//     const result: UserResponseModel = UserSchema.parse(body);

//     return result;
//   }
// }

interface Validator<T> {
  execute(body: unknown): T | Error;
}

export class ValidatorImpl implements Validator<UserResponseModel> {
  constructor(
    private readonly validationLibrary: ValidationLibrary<UserResponseModel>
  ) {}

  execute(body: unknown) {
    return this.validationLibrary.validate(body);
  }
}

interface ValidationLibrary<T> {
  validate(body: unknown): T | Error;
}
//---
