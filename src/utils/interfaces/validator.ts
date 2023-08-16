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
