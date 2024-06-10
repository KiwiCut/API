import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(payload: any): Promise<any> {
    // Lógica para validar usuário (pode ser verificação em banco de dados, etc.)
    // Retorne o usuário se válido, caso contrário, retorne null
  }

  async login(user: any) {
    const payload = { /* dados do usuário para incluir no token */ };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
