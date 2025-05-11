import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { IClaims } from 'src/domain/dtos/auth/claims.dto';
import { IAuthToken } from 'src/domain/ports/auth/authToken';

const JWT_SECRET = process.env.JWT_SECRET ?? null;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

@Injectable()
export class AuthTokenProvider implements IAuthToken {
  generateToken(claims: IClaims) {
    const options: jwt.SignOptions = {
      expiresIn: JWT_EXPIRATION,
    };
    if (!JWT_SECRET) {
      throw Error('JWT SECRET no valida');
    }
    try {
      return jwt.sign(claims, JWT_SECRET, options);
    } catch (e: unknown) {
      throw new UnauthorizedException('Error Generating token');
    }
  }
  verifyToken(token: string) {
    if (!JWT_SECRET) {
      throw new UnauthorizedException('JWT SECRET no valida');
    }

    try {
      return jwt.verify(token, JWT_SECRET) as IClaims;
    } catch (e: unknown) {
      if (e instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException('Error verification token');
      } else if (e instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedException('Token has expired');
      } else {
        throw new UnauthorizedException('Unauthorized');
      }
    }
  }
}
