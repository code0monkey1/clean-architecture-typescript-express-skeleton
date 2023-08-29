export interface ContactsMiddleware<T> {
  validate(body: unknown): T | Error;
}
