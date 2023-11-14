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
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth.guard';
import { CurrentUser } from '../users/user.decorator';
import { User } from '@prisma/client';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterUsersDto) {
    return await this.authService.register(registerDto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logOut(@CurrentUser() user: User) {
    if (!user) throw new NotFoundException('Current user not found');
    return await this.authService.logOut(user);
  }
}
