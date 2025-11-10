import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { User } from 'src/user/entity/user.model';

export interface AuthenticatedRequest extends Request {
  user?: Omit<User, 'password'>;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authorization = request.headers.authorization;

    if (!authorization) throw new UnauthorizedException();

    const token = authorization.split(' ')[1];

    try {
      const user: Omit<User, 'password'> =
        await this.jwtService.verifyAsync(token);
      request.user = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
