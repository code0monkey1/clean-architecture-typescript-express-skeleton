export type Person = {
  name: string;
};

export default interface Validator<T> {
  validate(body: unknown): T | Error;
}

export interface ValidationLibrary<T> {
  validate(body: unknown): Promise<T | Error>;
}

import { ZodError } from 'zod';
import { RegisterValidator } from '../src/utils/interfaces/validator';

describe('ValLibImpl', () => {
  let val_lib: ValidationLibrary<Person | Error>;

  beforeEach(() => {
    val_lib = new RegisterValidator();
  });

  it('should return a Person object when the body is valid', () => {
    const body: Person = { name: 'Hiran' };
    const result = val_lib.validate(body);
    expect(result).toEqual(body);
  });

  it('should return a ZodError when a person does not have a name filed', () => {
    const body = { fame: 'Hiran' };
    expect(async () => await val_lib.validate(body)).toThrow(ZodError);
  });
});
