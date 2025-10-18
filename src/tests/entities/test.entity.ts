import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Part } from 'src/parts/entities/part.entity';

@Entity('tests')
export class Test {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ default: 7200 })
  durationSec: number;

  @Column({ default: true })
  isPublic: boolean;

  @Column({ default: 0 })
  totalQuestions: number;

  @Column()
  audioUrl: string;

  // Quan hệ nhiều-nhiều với Part
  @ManyToMany(() => Part, { cascade: true })
  @JoinTable({
    name: 'test_parts', // tên bảng trung gian
    joinColumn: { name: 'test_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'part_id', referencedColumnName: 'id' },
  })
  parts?: Part[];

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
