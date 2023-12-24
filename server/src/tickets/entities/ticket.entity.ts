import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  orderId: string;

  @Column({ type: 'timestamp' })
  startsAt: Date;

  @Column({ type: 'int' })
  seat: number;

  @Column({ type: 'varchar', length: 255 })
  movieTitle: string;
}
