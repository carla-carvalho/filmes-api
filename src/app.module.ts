import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FilmsModule } from './films/films.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, FilmsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
