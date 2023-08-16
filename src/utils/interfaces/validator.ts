import { z } from 'zod';

export type Person = {
  name: string;
};
export interface ValidationLibrary<T> {
  validate(body: unknown): Promise<T | Error>;
}
export class RegisterValidator implements ValidationLibrary<Person> {
  async validate(body: unknown): Promise<Person | Error> {
    if (!body) {
      throw new Error('The body is empty');
    }

    const personSchema = z.object({
      name: z.string().min(3).max(20).trim(),
    });

    const person = await personSchema.parseAsync(body);

    return person;
  }
}
