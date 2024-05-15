// show.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Show } from 'src/entity/show.entity'

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
    private readonly connection: Connection,
  ) {}

  async incluirShow(nome: string, localCep: string, dataShow: Date, idArtista: number): Promise<void> {
    await this.connection.query(
      `
      EXEC kiwicut.incluirShow 
      '${nome}', '${localCep}', '${dataShow}','${idArtista}'
      `,
      [nome, localCep, dataShow, idArtista],
    );
  }

  async deletarShow(id: number): Promise<void> {
    const queryResult = await this.connection.query(
      `
      EXEC kiwicut.deletarShow '${id}'
      `,
      [id],
    );

    if (queryResult && queryResult.rowsAffected && queryResult.rowsAffected[0] === 0) {
      throw new Error('Show inexistente ou inválido');
    }
  }

  async atualizarShow(id: number, nome: string, localCep: string, dataShow: Date, idArtista: number): Promise<void> {
    const queryResult = await this.connection.query(
      `
      EXEC kiwicut.atualizarShow '${id}','${nome}','${localCep}','${dataShow}','${idArtista}'
      `,
      [id, nome, localCep, dataShow, idArtista],
    );

    if (queryResult && queryResult.rowsAffected && queryResult.rowsAffected[0] === 0) {
      throw new Error('Show inexistente ou inválido');
    }
  }

  async listarShows(): Promise<Show[]> {
    return await this.connection.query(
      `
      select * from kiwicut.Show
      `,
    );
  }

  async buscarShowPorId(id: number): Promise<Show> {
    const shows = await this.connection.query(
      `
      select * from kiwicut.Show where id = '${id}'
      `,
      [id],
    );

    if (shows.length === 0) {
      throw new Error('Show não encontrado');
    }

    return shows[0];
  }
}