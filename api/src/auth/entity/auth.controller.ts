import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dto/auth.dto';
import { UserService } from 'src/user/entity/user.service';

@Controller('auth')
export class AuthController {
  constructor(private UserService: UserService) {}
  @Post('login')
  async login(@Body(ValidationPipe) payload: LoginDto) {
    const { email } = payload;
    const user = await this.UserService.getByEmail(email);

    if (!user) throw new Error('Invalid credentials');

    return `found you, logging you in! ${JSON.stringify(user)}`;
  }

  @Post('register')
  async register(@Body(ValidationPipe) payload: RegisterDto) {
    const { email } = payload;
    const exists = await this.UserService.getByEmail(email);
    if (exists) throw new Error('Email is already registered');

    const newUser = await this.UserService.create(payload);

    /*
      create user session
    */

    return `registering! ${JSON.stringify(newUser)}`;
  }

  @Get('user')
  getUser() {
    return `checking user`;
  }
}
