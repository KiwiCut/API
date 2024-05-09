import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from './cliente.entity';
import { Show } from './show.entity';

@Entity({ name: 'Ingresso' })
export class Ingresso {
  @Column({ primary: true })
  cpfCliente: string;

  @Column({ primary: true })
  idShow: number;

  @Column()
  idIngresso: string;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'cpfCliente' })
  cliente: Cliente;

  @ManyToOne(() => Show)
  @JoinColumn({ name: 'idShow' })
  show: Show;
}
