import { PartialType } from '@nestjs/mapped-types';
import { CreateFilmDto } from './create-film.dto'
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateFilmDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nome: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  linkImagem: string;
}


