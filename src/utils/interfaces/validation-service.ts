export default interface Validator<T> {
  execute(body: T): void;
}
