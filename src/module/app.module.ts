import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from 'src/controller/app.controller';
import { Cliente } from 'src/entity/cliente.entity';
import { AppService } from 'src/service/app.service';
import { ClienteService } from 'src/service/cliente.services';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mssql',
        host: 'regulus.cotuca.unicamp.br',
        port: 1433,
        username: 'BD22300',
        password: 'BD22300',
        database: 'BD22300',
        entities: [],
        synchronize: true,
        extra: {
          encrypt: true, // Habilitar criptografia
          trustServerCertificate: true, // Confiança no certificado do servidor
        },
      }),
    }),
    TypeOrmModule.forFeature([Cliente]),
  ],
  
  controllers: [AppController],
  providers: [ClienteService, AppService],
})
export class AppModule {}
