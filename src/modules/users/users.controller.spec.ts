import { Test, TestingModule } from '@nestjs/testing';

import { JwtAuthGuard } from '../auth/auth.guard';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { Request } from 'express';
import { User } from '@prisma/client';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

export const mockUsers: Omit<User, 'password'> = {
  id: 1,
  email: 'johndoe@gmail.com',
  name: 'John Doe',
  countryCode: 'us',
  prefersLanguage: 'en-us',
  profilePictureUrl: 'https://unavatar.now.sh/fallback.png',
  timezone: 'America/Los_Angeles',
  enabled: true,
  prefersColorScheme: 'NO_PREFERENCE',
  notificationEmail: 'ACCOUNT',
  gender: 'UNKNOWN',
  role: 'USER',
  createdAt: new Date(),
  updatedAt: new Date('2023-11-14T02:19:06.589Z'),
};

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true }) // Override JwtAuthGuard for testing
      .compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      // Arrange
      const expectedUsers = mockUsers;
      jest.spyOn(usersService, 'getAllUsers').mockResolvedValue(expectedUsers);

      // Act
      const result = await usersController.getAllUsers();

      // Assert
      expect(result).toEqual(expectedUsers);
    });
  });

  describe('getCurrentUser', () => {
    it('should return the current user profile', async () => {
      // Arrange
      const mockRequest: Partial<Request> = {
        user: mockUsers,
      };
      jest.spyOn(usersService, 'getCurrentUser').mockResolvedValue(mockUsers);

      // Act
      const result = await usersController.getCurrentUser(
        mockRequest as Request,
      );

      // Assert
      expect(result).toEqual(mockUsers);
    });
  });
});
