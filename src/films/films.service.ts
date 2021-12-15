import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { PrismaService } from 'src/prisma.service';
import { Film } from '@prisma/client';
import { NOTFOUND } from 'dns';

@Injectable()
export class FilmsService {
  constructor(private database: PrismaService) {}

  async create(dadosFilmes: CreateFilmDto): Promise<Film> {
    const filmeExistente = await this.database.film.findUnique({
      where: { nome: dadosFilmes.nome },
  });

    if (filmeExistente) {
      throw new ConflictException('Esse filme já está cadastrado');
  }

  const filme = await this.database.film.create({ data: dadosFilmes})

  return filme;
  }
    

  async findAll(): Promise<Film[]> {
   const filmes = await this.database.film.findMany();
   return filmes
  }

  async findOne(id: string): Promise<Film> {
   const filmeExistente = await this.database.film.findUnique({
     where: { id}, 
   });

   if(!filmeExistente){
     throw new NotFoundException('Filme não encontrado');
   }

   return filmeExistente;
  }

  async update(id: string, updateFilmDto: UpdateFilmDto): Promise<Film> {
    const filme = await this.database.film.update({
      data: updateFilmDto,
      where: { id}, 
    });

  return filme;
  }

  async remove(id: string): Promise<{message: string}> {
    const filmeExistente = await this.database.film.findUnique({
      where: { id}, 
    });
 
    if(!filmeExistente){
      throw new NotFoundException('Filme não encontrado');
    }

    else{
      await this.database.film.delete({
        where: { id},
      });
    }
 
    return { message:'Filme excluído com sucesso'}
   
  }
}
