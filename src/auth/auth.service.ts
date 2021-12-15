import { Injectable, NotFoundException } from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(private database: PrismaService) {}

    async login(dadosdoLogin: CredentialsDto) {
        const usuarioExistente = await this.database.user.findUnique({
            where: { email: dadosdoLogin.email },
        });

        if(!usuarioExistente) {
            throw new  NotFoundException('Usuário não encontado');
        }

        const senhaValida = await bcrypt.compare(dadosdoLogin.senha, usuarioExistente.senha);

        return senhaValida;
    }
    }

