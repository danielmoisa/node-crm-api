import {
  Controller,
  Post,
  Body,
  Req,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { RegisterUsersDto } from './dto/register-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

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
  async logOut(@Req() req) {
    console.log(req.user);
    const currentUser = await this.usersService.getCurrentUser(req);
    if (!currentUser) throw new NotFoundException('Current user not found');
    return await this.authService.logOut(currentUser);
  }
}
