import { Injectable,UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/users.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(data: { name: string; email: string; password: string }) {
    const user = await new this.userModel(data).save();

    const payload = {
      userId: user._id,
      email: user.email,
    };

    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(data: { email: string; password: string }) {
    const user = await this.userModel.findOne({
      email: data.email,
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.password !== data.password) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      userId: user._id,
      email: user.email,
    };

    return {
      message: 'Login Success',
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
