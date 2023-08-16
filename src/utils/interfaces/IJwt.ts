/* eslint-disable @typescript-eslint/no-unsafe-call */

export default interface Jwt<T> {
  sign(tokenData: T, expiry: string, secret: string): string;
  verify(token: string, secret: string): T;
}
