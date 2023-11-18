import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { Request } from 'express';
import { User } from '@prisma/client';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('users service should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      // Arrange
      const mockUser: User = {
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
        password: 'johndoe',
        createdAt: new Date(),
        updatedAt: new Date('2023-11-14T02:19:06.589Z'),
      };

      const prismaCreateUserMock = jest
        .spyOn(prismaService.user, 'create')
        .mockResolvedValueOnce(mockUser);

      // Act
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
      };

      const result = await usersService.createUser(createUserDto);

      // Assert
      expect(result).toEqual(mockUser);
      expect(prismaCreateUserMock).toHaveBeenCalledWith({
        data: createUserDto,
      });
      expect(prismaCreateUserMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAllUsers', () => {
    it('should get all users', async () => {
      // Arrange
      const mockUsers: Omit<User, 'password'>[] = [
        {
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
        },
        {
          id: 2,
          email: 'johndoe2@gmail.com',
          name: 'John Doe2',
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
        },
      ];

      const prismaFindManyMock = jest
        .spyOn(prismaService.user, 'findMany')
        .mockResolvedValueOnce(mockUsers as User[]);

      // Act
      const result = await usersService.getAllUsers();

      // Assert
      const expectedUsers = await Promise.all(
        mockUsers.map((user) => prismaService.expose(user)),
      );
      expect(result).toEqual(expectedUsers);
      expect(prismaFindManyMock).toHaveBeenCalledWith();
      expect(prismaFindManyMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCurrentUser', () => {
    it('should return the current user from the request', async () => {
      // Arrange
      const mockUser = {
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
      const mockRequest = { user: mockUser } as any;

      // Act
      const result = await usersService.getCurrentUser(mockRequest);

      // Assert
      expect(result).toEqual(mockUser);
    });

    it('should return null or undefined if no user is present in the request', async () => {
      // Arrange
      const mockRequestWithUndefinedUser = {} as Request;

      // Act
      const resultWithUndefinedUser = await usersService.getCurrentUser(
        mockRequestWithUndefinedUser,
      );

      // Assert
      expect(resultWithUndefinedUser).toBeUndefined();
    });
  });
});
