import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from '@prisma/client';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post('create')
  create(@Body() createFilmDto: CreateFilmDto): Promise<Film> {
    return this.filmsService.create(createFilmDto);
  }

  @Get('get-all')
  findAll(): Promise<Film[]> {
    return this.filmsService.findAll();
  }

  @Get('find-one/:id')
  findOne(@Param('id') id: string): Promise<Film> {
    return this.filmsService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto): Promise<Film> {
    return this.filmsService.update(id, updateFilmDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string): Promise<{message: string}> { 
    return this.filmsService.remove(id);
  }
}
