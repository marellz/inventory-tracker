import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RegisterDto } from 'src/auth/dto/auth.dto';
import { UserModel } from './user.model';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
  ) {}

  async getByEmail(email: string) {
    return this.userModel.findOne({
      where: {
        email,
      },
    });
  }

  async create(user: RegisterDto) {
    return this.userModel.create({ ...user, id: randomUUID() });
  }
}
