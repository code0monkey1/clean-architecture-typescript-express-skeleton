export interface Validator<T> {
  execute(body: T): void;
}
