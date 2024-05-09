import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from 'src/controller/app.controller';
import { AppService } from 'src/service/app.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mssql',
        host: 'regulus.cotuca.unicamp.br',
        port: 1433,
        username: 'BD23341',
        password: 'BD23341',
        database: 'BD23341',
        entities: [],
        synchronize: true,
        extra: {
          encrypt: true, // Habilitar criptografia
          trustServerCertificate: true, // Confiança no certificado do servidor
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
