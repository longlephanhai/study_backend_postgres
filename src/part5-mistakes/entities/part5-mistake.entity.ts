import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('part5_mistakes')
export class Part5Mistakes {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  userId: string;

  @Column('uuid', { array: true, nullable: false })
  categoryPart5Mistakes: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('jsonb', { nullable: true })
  createdBy?: {
    _id: string;
    email: string;
  };

  @Column('jsonb', { nullable: true })
  updatedBy?: {
    _id: string;
    email: string;
  };

  @Column('jsonb', { nullable: true })
  deletedBy?: {
    _id: string;
    email: string;
  };

  @Column({ default: false })
  isDeleted: boolean;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
