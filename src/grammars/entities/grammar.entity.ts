import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('grammars')
export class Grammar {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

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
