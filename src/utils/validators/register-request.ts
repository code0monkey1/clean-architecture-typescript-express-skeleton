import { IUser } from 'data/models/User';
import { z } from 'zod';

export type User = Pick<IUser, 'name'>;

export interface ValidationLibrary<T> {
  validate(body: unknown): Promise<T | Error>;
}
class RegisterRequest implements ValidationLibrary<User> {
  async validate(body: unknown): Promise<User | Error> {
    const personSchema = z.object({
      name: z.string().min(2).max(20).trim(),
    });

    const person = await personSchema.parseAsync(body);
    return person;
  }
}

export default RegisterRequest;
