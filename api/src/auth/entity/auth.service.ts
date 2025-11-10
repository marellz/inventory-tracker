import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entity/user.model';
import { JwtService } from '@nestjs/jwt';

export interface AuthenticationResponse {
  accessToken: string;
  user: Omit<User, 'password'>;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async authenticate(
    user: Omit<User, 'password'>,
  ): Promise<AuthenticationResponse> {
    const accessToken = await this.jwtService.signAsync(user);

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
