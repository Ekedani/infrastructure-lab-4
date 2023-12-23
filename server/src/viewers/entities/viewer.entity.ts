import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Viewer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birthDate: Date;

  @Column({
    type: 'enum',
    enum: ['male', 'female'],
  })
  gender: string;
}
