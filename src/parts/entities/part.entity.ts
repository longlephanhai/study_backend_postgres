import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Question } from 'src/question/entities/question.entity';

@Entity('parts')
export class Part {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  partNo: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  durationSec: number;

  @Column({ default: 300 })
  orderIndex: number;

  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => Question)
  @JoinTable({
    name: 'part_questions',
    joinColumn: { name: 'part_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'question_id', referencedColumnName: 'id' },
  })
  questions: Question[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('jsonb', { nullable: true })
  createdBy?: { _id: string; email: string };

  @Column('jsonb', { nullable: true })
  updatedBy?: { _id: string; email: string };

  @Column('jsonb', { nullable: true })
  deletedBy?: { _id: string; email: string };

  @Column({ default: false })
  isDeleted: boolean;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
