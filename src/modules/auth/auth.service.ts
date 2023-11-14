import * as bcrypt from 'bcrypt';

import { Injectable, NotFoundException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-user.dto';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { RegisterUsersDto } from './dto/register-user.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const users = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!users) {
      throw new NotFoundException('user not found');
    }

    const validatePassword = await bcrypt.compare(password, users?.password);

    if (!validatePassword) {
      throw new NotFoundException('Invalid password');
    }

    return {
      token: this.jwtService.sign({ email }),
    };
  }

  async register(createDto: RegisterUsersDto) {
    const createUser = new User();
    createUser.name = createDto.name;
    createUser.email = createDto.email;

    createUser.password = await bcrypt.hash(createDto?.password, 10);

    const user = await this.usersService.createUser(createUser);

    return {
      token: this.jwtService.sign(
        { email: user.email },
        { expiresIn: process.env.JWT_EXPIRES_IN },
      ),
    };
  }

  async logOut(user: User) {
    this.jwtService.sign({ email: user?.email }, { expiresIn: 0 });
    return {
      message: `User ${user?.name} was signed out!`,
    };
  }
}
