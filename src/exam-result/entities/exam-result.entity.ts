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
import { Part } from 'src/parts/entities/part.entity';
import { Question } from 'src/question/entities/question.entity';

@Entity('exam_results')
export class ExamResult {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  testId: string;

  @Column()
  userId: string;

  @Column()
  totalCorrect: number;

  @Column()
  totalListeningCorrect: number;

  @Column()
  totalReadingCorrect: number;

  // Quan hệ với Part
  @ManyToMany(() => Part)
  @JoinTable({
    name: 'exam_result_parts',
    joinColumn: { name: 'exam_result_id', referencedColumnName: '_id' },
    inverseJoinColumn: { name: 'part_id', referencedColumnName: '_id' },
  })
  parts: Part[];

  // Câu trả lời đúng
  @ManyToMany(() => Question)
  @JoinTable({
    name: 'exam_result_correct_answers',
    joinColumn: { name: 'exam_result_id', referencedColumnName: '_id' },
    inverseJoinColumn: { name: 'question_id', referencedColumnName: '_id' },
  })
  correctAnswer: Question[];

  // Câu trả lời sai
  @ManyToMany(() => Question)
  @JoinTable({
    name: 'exam_result_wrong_answers',
    joinColumn: { name: 'exam_result_id', referencedColumnName: '_id' },
    inverseJoinColumn: { name: 'question_id', referencedColumnName: '_id' },
  })
  wrongAnswer: Question[];

  // Câu không trả lời
  @ManyToMany(() => Question)
  @JoinTable({
    name: 'exam_result_no_answers',
    joinColumn: { name: 'exam_result_id', referencedColumnName: '_id' },
    inverseJoinColumn: { name: 'question_id', referencedColumnName: '_id' },
  })
  noAnswer: Question[];

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
