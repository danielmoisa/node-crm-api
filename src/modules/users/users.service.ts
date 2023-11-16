import { ConflictException, Injectable } from '@nestjs/common';

import { CONFLIT_EMAIL_ADDRESS } from '../../errors/errors.constants';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return this.prisma.expose(users);
  }

  async createUser(createUserDto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: {
        email: createUserDto?.email,
      },
    });

    if (existing) throw new ConflictException(CONFLIT_EMAIL_ADDRESS);

    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async getCurrentUser(req: Request) {
    const currentUser = req?.user;
    return currentUser;
  }
}
