import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthTokenProvider } from '../adapter/auth/authTokenProvider';
import { IClaims } from 'src/domain/dtos/auth/claims.dto';

declare module 'express' {
  interface Request {
    user?: IClaims;
  }
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authTokenProvider: AuthTokenProvider) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];

    try {
      const claims: IClaims = this.authTokenProvider.verifyToken(token);
      request.user = claims;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
