import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @UseGuards(AuthGuard())
  @Post('create')
  create(@Body() createFilmDto: CreateFilmDto): Promise<Film> {
    return this.filmsService.create(createFilmDto);
  }

  @UseGuards(AuthGuard())
  @Get('get-all')
  findAll(): Promise<Film[]> {
    return this.filmsService.findAll();
  }

  @UseGuards(AuthGuard())
  @Get('find-one/:id')
  findOne(@Param('id') id: string): Promise<Film> {
    return this.filmsService.findOne(id);
  }

  @UseGuards(AuthGuard())
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto): Promise<Film> {
    return this.filmsService.update(id, updateFilmDto);
  }

  @UseGuards(AuthGuard())
  @Delete('delete/:id')
  remove(@Param('id') id: string): Promise<{message: string}> { 
    return this.filmsService.remove(id);
  }
}
