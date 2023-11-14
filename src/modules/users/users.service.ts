import { ConflictException, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../providers/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUser() {
    const users = await this.prisma.user.findMany();
    return this.prisma.expose(users);
  }

  async createUser(createUserDto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: {
        email: createUserDto?.email,
      },
    });

    if (existing) {
      throw new ConflictException('Email address already exists');
    }

    return this.prisma.user.create({
      data: createUserDto,
    });
  }
}
