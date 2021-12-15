import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FilmsController],
  providers: [FilmsService, PrismaService]
})
export class FilmsModule {}
