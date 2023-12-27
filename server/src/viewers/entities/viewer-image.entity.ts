import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ViewerImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'bytea' })
  data: Buffer;

  @Column({ type: 'varchar' })
  format: string;

  @Column({ type: 'uuid', unique: true })
  viewerId: string;
}
