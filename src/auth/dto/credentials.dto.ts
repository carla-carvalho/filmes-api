import { IsString, IsEmail, IsNotEmpty, Length} from 'class-validator';

export class CredentialsDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(5,15)
    senha: string;
}
