export type Person = {
  name: string;
};

export default interface Validator<T> {
  validate(body: unknown): T | Error;
}

export class PersonValidator implements Validator<Person> {
  constructor(private v: ValidationLibrary<Person>) {}

  validate(body: unknown) {
    const person = this.v.validate(body);
    return person;
  }
}

export interface ValidationLibrary<T> {
  validate(body: unknown): T | Error;
}
import { ZodError, z } from 'zod';
class ValLibImpl implements ValidationLibrary<Person> {
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

describe('ValLibImpl', () => {
  let val_lib: ValidationLibrary<Person>;

  beforeEach(() => {
    val_lib = new ValLibImpl();
  });

  it('should throw an error when the body is null', () => {
    expect(() => val_lib.validate('')).toThrowError('The body is empty');
  });

  it('should return a Person object when the body is valid', () => {
    const body: Person = { name: 'Hiran' };
    const result = val_lib.validate(body);
    expect(result).toEqual(body);
  });

  it('should return a Person object when the body is valid', () => {
    const body = { fame: 'Hiran' };
    expect(val_lib.validate(body)).toThrow(ZodError);
  });
});
