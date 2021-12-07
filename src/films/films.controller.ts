import { Controller, Post, Body } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
    constructor(private service: FilmsService){}

    @Post('create')
    createFilms(@Body()data){
    return this.service.createFilm(data);
    }
}
