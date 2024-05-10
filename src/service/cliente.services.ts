import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Cliente } from '../entity/cliente.entity';
import { promises } from 'dns';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    private readonly connection: Connection, // Injetar a conexão do TypeORM
  ) {}

  async incluirCliente(
    nome: string,
    sobrenome: string,
    email: string,
    telefone: string,
    senha: string,
    cpf: string,
    cep: string,
    dataNascimento: Date,
  ): Promise<void> {
    await this.connection.query(
      `
      EXEC kiwicut.incluirCliente 
        @nome = $1, @sobrenome = $2, @email = $3,
        @telefone = $4, @senha = $5, @cpf = $6,
        @cep = $7, @dataNascimento = $8
      `,
      [nome, sobrenome, email, telefone, senha, cpf, cep, dataNascimento],
    );
  }
  async deletarCliente(cpf: string, email: string): Promise<void> {
    const queryResult = await this.connection.query(
      `
      EXEC kiwicut.deletarCliente @cpf = $1, @email = $2
      `,
      [cpf, email],
    );

    if (queryResult && queryResult.rowsAffected && queryResult.rowsAffected[0] === 0) {
      throw new Error('Cliente inexistente ou inválido');
    }
  }

  async atualizarNomeCliente(nome: string, cpf: string, email: string): Promise<void> {
    const queryResult = await this.connection.query(
      `
      EXEC kiwicut.atualizarNomeCliente @nome = $1, @cpf = $2, @email = $3
      `,
      [nome, cpf, email],
    );

    if (queryResult && queryResult.rowsAffected && queryResult.rowsAffected[0] === 0) {
      throw new Error('CPF inexistente e/ou inválido');
    }
  }

  async atualizarSobrenomeCliente(sobrenome: string, cpf: string, email: string): Promise<void> {
    const queryResult = await this.connection.query(
      `
      EXEC kiwicut.atualizarSobrenomeCliente @sobrenome = $1, @cpf = $2, @email = $3
      `,
      [sobrenome, cpf, email],
    );

    if (queryResult && queryResult.rowsAffected && queryResult.rowsAffected[0] === 0) {
      throw new Error('CPF inexistente e/ou inválido');
    }
  }

  async atualizarTelefoneCliente(telefone: string, cpf: string, email: string): Promise<void> {
    const queryResult = await this.connection.query(
      `
      EXEC kiwicut.atualizarTelefoneCliente @telefone = $1, @cpf = $2, @email = $3
      `,
      [telefone, cpf, email],
    );

    if (queryResult && queryResult.rowsAffected && queryResult.rowsAffected[0] === 0) {
      throw new Error('Número de telefone atrelado ao CPF é inexistente e/ou inválido');
    }
  }

  async atualizarCepCliente(cep: string, cpf: string, email: string): Promise<void> {
    const queryResult = await this.connection.query(
      `
      EXEC kiwicut.atualizarCepCliente @cep = $1, @cpf = $2, @email = $3
      `,
      [cep, cpf, email],
    );

    if (queryResult && queryResult.rowsAffected && queryResult.rowsAffected[0] === 0) {
      throw new Error('CEP atrelado ao CPF é inexistente e/ou inválido');
    }
  }

  async atualizarSenhaCliente(senha: string, cpf: string, email: string): Promise<void> {
    const queryResult = await this.connection.query(
      `
      EXEC kiwicut.atualizarSenhaCliente @senha = $1, @cpf = $2, @email = $3
      `,
      [senha, cpf, email],
    );

    if (queryResult && queryResult.rowsAffected && queryResult.rowsAffected[0] === 0) {
      throw new Error('CPF inexistente e/ou inválido');
    }
  }

  async visualizarTodos(): Promise<void>{
    const queryResult = await this.connection.query(
      `
      Select * from kiwicut.Cliente
      `,
    );
  }


  
}