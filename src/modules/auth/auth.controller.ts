import {
  Controller,
  Post,
  Body,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { RegisterUsersDto } from './dto/register-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth.guard';
import { CurrentUser } from '../users/user.decorator';
import { User } from '@prisma/client';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login to the application' })
  @ApiResponse({
    status: 200,
    description: 'Returns the JWT token upon successful login.',
  })
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'Returns the JWT token upon successful registration.',
  })
  @ApiBody({ type: RegisterUsersDto })
  async register(@Body() registerDto: RegisterUsersDto) {
    return await this.authService.register(registerDto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Logout from the application' })
  @ApiResponse({
    status: 200,
    description: 'Returns a success message upon successful logout.',
  })
  @ApiResponse({ status: 404, description: 'Current user not found.' })
  async logOut(@CurrentUser() user: User) {
    if (!user) throw new NotFoundException('Current user not found');
    return await this.authService.logOut(user);
  }
}
