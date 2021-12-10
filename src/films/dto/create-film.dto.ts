import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFilmDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  anoLancamento: string;

  @IsString()
  @IsNotEmpty()
  genero: string;

  @IsString()
  @IsNotEmpty()
  diretor: string;

  @IsString()
  @IsNotEmpty()
  linkImagem: string;
}
