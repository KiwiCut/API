// src/service/users.service.ts
import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entity'; // Supondo que você tenha uma entidade de usuário
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
