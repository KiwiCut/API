import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Cliente } from '../entity/cliente.entity';
import { promises } from 'dns';
import { cp } from 'fs';

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
      '${nome}', '${sobrenome}', '${email}','${telefone}','${senha}','${cpf}','${cep}','${dataNascimento}'
          
      `,
      [nome, sobrenome, email, telefone, senha, cpf, cep, dataNascimento], 
  );
  }
  async deletarCliente(cpf: string, email: string): Promise<void> {
    const queryResult = await this.connection.query(
      `
      EXEC kiwicut.deletarCliente '${cpf}','${email}'
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
      EXEC kiwicut.atualizarNomeCliente '${nome}','${cpf}','${email}'
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
      EXEC kiwicut.atualizarSobrenomeCliente '${sobrenome}','${cpf}','${email}'
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
      EXEC kiwicut.atualizarTelefoneCliente '${telefone}','${cpf}','${email}'
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
      EXEC kiwicut.atualizarCepCliente '${cep}','${cpf}','${email}'
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
      EXEC kiwicut.atualizarSenhaCliente '${senha}','${cpf}','${email}'
      `,
      [senha, cpf, email],
    );

    if (queryResult && queryResult.rowsAffected && queryResult.rowsAffected[0] === 0) {
      throw new Error('CPF inexistente e/ou inválido');
    }
  }

  async visualizarTodos(): Promise<Cliente[]> { // Modifique o tipo de retorno para Cliente[]
    return await this.connection.query(
      `
      select * from kiwicut.Cliente
      `,
      
    ); // Retorna todos os clientes do banco de dados
  }


  
}