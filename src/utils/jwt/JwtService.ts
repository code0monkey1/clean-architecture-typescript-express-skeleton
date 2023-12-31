/* eslint-disable @typescript-eslint/no-unsafe-call */
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
import IJwt from '../interfaces/IJwt';

export type TokenData = {
  _id: string;
  role: string;
};

class JwtService implements IJwt<TokenData> {
  sign(tokenData: TokenData, expiry = '60s', secret = JWT_SECRET): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return jwt.sign(tokenData, secret, { expiresIn: expiry });
  }
  verify(token: string, secret = JWT_SECRET): TokenData {
    return jwt.verify(token, secret) as TokenData;
  }
}

export default JwtService;
