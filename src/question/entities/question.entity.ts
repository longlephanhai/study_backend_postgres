import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  numberQuestion: number;

  @Column({ nullable: true })
  questionContent?: string;

  @Column('text', { array: true })
  options: string[];

  @Column()
  correctAnswer: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  explanation?: string;

  @Column({ nullable: true })
  audioUrl?: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  transcript?: string;

  @Column('text', { array: true, nullable: true })
  reading?: string[];

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
