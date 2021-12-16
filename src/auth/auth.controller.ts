import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import  AuthUser from './auth-user.decorator';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dados: CredentialsDto) {
   return this.authService.login(dados);
  }

  @UseGuards(AuthGuard())
  @Get('profile')
  profile(@AuthUser() user: User): User {
    return user;
  }
  }