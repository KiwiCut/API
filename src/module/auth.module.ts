// src/module/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../service/auth.service';
import { UsersService } from 'src/service/user.service';
import { JwtStrategy } from './estrategiaJWT';
import { User } from 'src/entity/user.entity';
import { AuthController } from '../controller/auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'yourSecretKey', // Substitua 'yourSecretKey' pela sua chave secreta
      signOptions: { expiresIn: '60m' }, // Token válido por 60 minutos
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, UsersService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
