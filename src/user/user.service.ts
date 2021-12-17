import { Injectable, ConflictException, UnauthorizedException, NotFoundException, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { User, Film } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private database: PrismaService){}

  async createUser(userData: CreateUserDto): Promise<User> {

    if (userData.senha !== userData.confirmacaoSenha){
      throw new UnauthorizedException('As senhas não coincidem')
    }
    const userExists = await this.database.user.findUnique({
      where: { email: userData.email },
    });

    if (userExists) {
      throw new ConflictException('E-mail já cadastrado');
    }

    const jumps = 10;
    const hashPassword = await bcrypt.hash(userData.senha, jumps);

    delete userData.confirmacaoSenha;

    const user = await this.database.user.create({
      data:{
        ...userData,
        senha: hashPassword,
      },
    });

    delete user.senha;
    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user =  await this.database.user.update({
      data,
      where: { id: id},
    });

    delete user.senha;
    return user;
  }

  async findMany(): Promise<any[]> {
    const user =  await this.database.user.findMany();

    const userNoPass = user.map(({senha, ...resto}) => resto);
    return userNoPass;
  }

  async findUni(id: string): Promise<User> {
    const user = await this.database.user.findUnique({
    where: {id},
    });

    if(!user) {
      throw new NotFoundException('Usuário não encontrado',);
    }
    delete user.senha;
    return user;
  }

  async delete( id: string): Promise<{message: string}> {
    const user = await this.database.user.findUnique({
      where: { id },
    });

    if(!user) {
      throw new NotFoundException('Usuário não encontrado',);
    }

    else{
      await this.database.user.delete({
        where: { id },
      });
    }

    return {
      message: 'Usuário excluído com sucesso'
    };
  }

  async addList(user: User, filmId: string){
    const filme = await this.database.film.findUnique({
      where: { id: filmId},
    });

    if(!filme){
      throw new NotFoundException('Filme não encontrado');
    }

    const usuario = await this.database.user.update({
      where: { id: user.id},
      data: {
        filmes: {
          connect: {
            id: filme.id
          },
        },
       },
       include: {
         filmes: true,
       }
    });

    delete usuario.senha;
    return usuario;
  }
  
}




