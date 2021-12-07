import { Injectable } from '@nestjs/common';

@Injectable()
export class FilmsService {
    banco = [];

    createFilm(data){
        this.banco.push(data);
        return this.banco;
    }
}
