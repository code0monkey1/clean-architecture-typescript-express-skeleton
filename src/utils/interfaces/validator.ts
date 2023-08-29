import { z } from 'zod';

export type Person = {
  name: string;
};
export interface ValidationLibrary<T> {
  validate(
    body: unknown
  ): Promise<{ success: boolean; errors: unknown; data: T | null }>;
}
export class RegisterValidator implements ValidationLibrary<Person> {
  async validate(
    body: unknown
  ): Promise<{ success: boolean; errors: unknown; data: Person | null }> {
    try {
      const personSchema = z.object({
        name: z.string().min(3).max(20).trim(),
      });

      const person = await personSchema.parseAsync(body);

      return { success: true, errors: null, data: person };
    } catch (err: unknown) {
      let errors = '';
      if (err instanceof Error) {
        errors += err.message;
      }

      return { success: false, errors, data: null };
    }
  }
}
