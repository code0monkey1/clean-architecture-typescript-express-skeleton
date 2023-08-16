export default interface Validator<T> {
  validate(body: unknown): T | Error;
}
