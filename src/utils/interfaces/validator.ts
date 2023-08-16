import { z } from 'zod';

export type Person = {
  name: string;
};
export interface ValidationLibrary<T> {
  validate(body: unknown): T | Error;
}
export class RegisterValidator implements ValidationLibrary<Person> {
  validate(body: unknown): Person | Error {
    if (!body) {
      throw new Error('The body is empty');
    }

    const personSchema = z.object({
      name: z.string().min(3).max(20).trim(),
    });

    const person = personSchema.parse(body);

    return person;
  }
}
