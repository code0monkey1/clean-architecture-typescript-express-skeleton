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
      const personSchema = z
        .object({
          name: z.string().min(3).max(20).trim(),
          email: z.string().email(),
          confirm_email: z.string().email(),
          password: z.string(),
          confirm_password: z.string(),
        })
        .refine((data) => data.email === data.confirm_email, {
          message: 'email and confirm_email should not same',
          path: ['confirm_email'],
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
