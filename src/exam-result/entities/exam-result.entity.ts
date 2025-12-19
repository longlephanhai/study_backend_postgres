import { Part } from 'src/parts/entities/part.entity';
import { Test } from 'src/tests/entities/test.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('exam_results')
export class ExamResult {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  // @Column()
  // testId: string;

  // @Column()
  // userId: string;

  @ManyToOne(() => Test)
  @JoinColumn({ name: 'testId' })
  test: Test;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ default: 0 })
  totalCorrect: number;

  @Column({ default: 0 })
  totalListeningCorrect: number;

  @Column({ default: 0 })
  totalReadingCorrect: number;


  @Column('jsonb', { default: [] })
  correctAnswer: string[];

  @Column('jsonb', { default: [] })
  wrongAnswer: string[];

  @Column('jsonb', { default: [] })
  noAnswer: string[];


  @ManyToMany(() => Part)
  @JoinTable({ name: 'exam_result_parts' })
  parts: Part[];

  @Column({ nullable: true })
  totalScore?: number;

  @Column({ nullable: true })
  readingScore?: number;

  @Column({ nullable: true })
  listeningScore?: number;

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
