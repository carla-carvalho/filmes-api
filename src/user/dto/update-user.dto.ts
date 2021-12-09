import { IsString, IsEmail,IsOptional, IsNotEmpty, Length } from "class-validator";

export class UpdateUserDto {

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(2, 100)
    nome: string;

    @IsEmail()
    @IsOptional()
    @IsNotEmpty()
    email: string;
}