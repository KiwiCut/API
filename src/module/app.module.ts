import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from 'src/controller/app.controller';
import { ShowController } from 'src/controller/show.controller';
import { Cliente } from 'src/entity/cliente.entity';
import { AppService } from 'src/service/app.service';
import { ClienteService } from 'src/service/cliente.services';
import { ShowService } from 'src/service/show.services';
import { Show } from 'src/entity/show.entity';

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
    TypeOrmModule.forFeature([Cliente,Show],),
  ],
  
  controllers: [AppController, ShowController],
  providers: [ClienteService, AppService,ShowService],
})
export class AppModule {}
