import { ZodError, z } from 'zod';

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
        email: z.string().email(),
      });

      const person = await personSchema.parseAsync(body);

      return { success: true, errors: null, data: person };
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        return { success: false, errors: err.flatten(), data: null };
      } else {
        throw err;
      }
    }
  }
}
