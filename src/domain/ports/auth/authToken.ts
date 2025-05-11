import { IClaims } from 'src/domain/dtos/auth/claims.dto';

export interface IAuthToken {
  generateToken(claims: IClaims);
  verifyToken(token: string);
}
