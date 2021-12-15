import { IsString, IsEmail,IsNotEmpty, Length } from "class-validator";

export class CreateUserDto{

    @IsString({message: 'Digite o nome a ser cadastrado'})
    @IsNotEmpty({message: 'O campo não pode ficar vazio'})
    nome: string;

    @IsNotEmpty({message: 'O campo não pode ficar vazio'})
    @IsEmail({message: 'Digite um e-mail válido'})
    email: string;

    @IsString({message: 'Digite a data de nascimento'})
    @IsNotEmpty({message: 'O campo não pode ficar vazio'})
    nascimento: string;

    @IsString({message: 'Digite uma senha válida'})
    @IsNotEmpty({message: 'O campo não pode ficar vazio'})
    @Length(5, 10)
    senha: string;

    @IsString()
    @IsNotEmpty()
    linkimagem: string;

    @IsString({message: 'Digite novamente a senha'})
    @IsNotEmpty({message: 'O campo não pode ficar vazio'})
    confirmacaoSenha: string;
}