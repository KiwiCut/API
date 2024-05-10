import { Controller, Post, Body, Delete, Param, Put, Get } from '@nestjs/common';
import { ClienteService } from 'src/service/cliente.services';


@Controller('clientes')
export class AppController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('incluir')
  async incluirCliente(
    @Body('nome') nome: string,
    @Body('sobrenome') sobrenome: string,
    @Body('email') email: string,
    @Body('telefone') telefone: string,
    @Body('senha') senha: string,
    @Body('cpf') cpf: string,
    @Body('cep') cep: string,
    @Body('dataNascimento') dataNascimento: Date,
  ): Promise<void> {
    await this.clienteService.incluirCliente(nome, sobrenome, email, telefone, senha, cpf, cep, dataNascimento);
  }

  @Delete(':cpf/:email')
  async deletarCliente(
    @Param('cpf') cpf: string,
    @Param('email') email: string,
  ): Promise<void> {
    await this.clienteService.deletarCliente(cpf, email);
  }

  @Put(':cpf/:email/nome')
  async atualizarNomeCliente(
    @Param('cpf') cpf: string,
    @Param('email') email: string,
    @Body('nome') nome: string,
  ): Promise<void> {
    await this.clienteService.atualizarNomeCliente(nome, cpf, email);
  }

  @Put(':cpf/:email/sobrenome')
  async atualizarSobrenomeCliente(
    @Param('cpf') cpf: string,
    @Param('email') email: string,
    @Body('sobrenome') sobrenome: string,
  ): Promise<void> {
    await this.clienteService.atualizarSobrenomeCliente(sobrenome, cpf, email);
  }

  @Put(':cpf/:email/telefone')
  async atualizarTelefoneCliente(
    @Param('cpf') cpf: string,
    @Param('email') email: string,
    @Body('telefone') telefone: string,
  ): Promise<void> {
    await this.clienteService.atualizarTelefoneCliente(telefone, cpf, email);
  }

  @Put(':cpf/:email/cep')
  async atualizarCepCliente(
    @Param('cpf') cpf: string,
    @Param('email') email: string,
    @Body('cep') cep: string,
  ): Promise<void> {
    await this.clienteService.atualizarCepCliente(cep, cpf, email);
  }

  @Put(':cpf/:email/senha')
  async atualizarSenhaCliente(
    @Param('cpf') cpf: string,
    @Param('email') email: string,
    @Body('senha') senha: string,
  ): Promise<void> {
    await this.clienteService.atualizarSenhaCliente(senha, cpf, email);
  }

  @Get('buscar')
  async visualizarTodos(): Promise<void> {
    await this.clienteService.visualizarTodos();
  }


}
