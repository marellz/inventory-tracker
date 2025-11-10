import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dto/auth.dto';
import { UserService } from 'src/user/entity/user.service';
import { AuthenticationResponse, AuthService } from './auth.service';
import { User } from 'src/user/entity/user.model';
import { type AuthenticatedRequest, AuthGuard } from '../auth.guard';
import bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async login(
    @Body(ValidationPipe) payload: LoginDto,
  ): Promise<AuthenticationResponse> {
    const { email, password } = payload;
    const _user = await this.userService.getByEmail(email);
    if (_user === null) throw new UnauthorizedException();
    const user = _user.get() as User;

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) throw new UnauthorizedException();

    return await this.authService.authenticate({
      email: user.email,
      name: user.name,
      id: user.id,
    });
  }

  @Post('register')
  async register(
    @Body(ValidationPipe) payload: RegisterDto,
  ): Promise<AuthenticationResponse> {
    const { email, password } = payload;
    const exists = await this.userService.getByEmail(email);
    if (exists) throw new Error('Email is already registered');

    const hashed = await bcrypt.hash(password, 10);
    const _user = await this.userService.create({
      ...payload,
      password: hashed,
    });
    const user = _user.get() as User;
    /*
      create user session
    */
    return await this.authService.authenticate({
      email: user.email,
      name: user.name,
      id: user.id,
    });
  }

  @UseGuards(AuthGuard)
  @Get('user')
  getUser(@Request() request: AuthenticatedRequest) {
    return request.user;
  }
}
