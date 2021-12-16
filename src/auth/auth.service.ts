import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';


@Injectable()
export class AuthService {
    constructor(private database: PrismaService, private jwt: JwtService ) {}

    async login(dadosdoLogin: CredentialsDto) {
        const usuarioExistente = await this.database.user.findUnique({
            where: { email: dadosdoLogin.email },
        });

        if(!usuarioExistente) {
            throw new  NotFoundException('Usuário não encontado');
        }

        const senhaValida = await bcrypt.compare(dadosdoLogin.senha, usuarioExistente.senha);

       if(senhaValida){
           const acesso = {
               email: usuarioExistente.email,
           };

           const token = await this.jwt.sign(acesso);

           return { token };
       }
    
       else{
           throw new UnauthorizedException('As credenciais são inválidas');
    }
 }

}

