import { Controller, Post, Body, Get } from '@nestjs/common';
import { create } from 'domain';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private service: UserService){

  }
    
    @Post('create')
    createUser(@Body() data:CreateUserDto): CreateUserDto[]{
        return this.service.createUser(data);
    }

    @Get('pegar-todos')
    getUsers(): CreateUserDto[]{
        return this.service.getUsers();
    }
}
