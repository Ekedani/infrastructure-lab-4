import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Viewer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '255' })
  firstName: string;

  @Column({ type: 'varchar', length: '255' })
  lastName: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @Column({
    type: 'enum',
    enum: ['male', 'female'],
  })
  gender: string;
}
