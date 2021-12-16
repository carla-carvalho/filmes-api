import { Controller, Post, Body, Patch, Param, Get, Delete, UseGuards } from '@nestjs/common';
import { create } from 'domain';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Post('create')
  createUser(@Body() data: CreateUserDto): Promise<User>  {
    return this.service.createUser(data);
  }

  @UseGuards(AuthGuard())
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User> {
  return this.service.update(id, data);      
   }

   @UseGuards(AuthGuard())
   @Delete('delete/:id')
   delete (@Param('id') id: string): Promise<{message: string}> {
     return this.service.delete(id);
   }
}
