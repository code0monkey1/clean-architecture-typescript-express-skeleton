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

describe('PersonValidator', () => {
  it('should throw error when value is invalid', () => {
    class ValLibImpl implements ValidationLibrary<Person> {
      validate(_body: unknown): Person | Error {
        throw new Error('Method not implemented.');
      }
    }

    const val_lib = new ValLibImpl();

    const sut = new PersonValidator(val_lib);

    sut.validate({ name: 'Hiran' });
  });
});
