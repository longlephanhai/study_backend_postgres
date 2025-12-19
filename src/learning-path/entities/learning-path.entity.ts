import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { LearningStep } from 'src/learning-step/entities/learning-step.entity';
import { Survey } from 'src/surveys/entities/survey.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('learning_paths')
export class LearningPath {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @ManyToOne(() => Survey, { eager: true })
  @JoinColumn({ name: 'surveyId' })
  survey: Survey;

  @OneToMany(() => LearningStep, step => step.learningPath, {
    cascade: true,
  })
  steps: LearningStep[];

  @Column({ default: 1 })
  currentDay: number;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ type: 'jsonb', nullable: true })
  createdBy: { _id: string; email: string };

  @Column({ type: 'jsonb', nullable: true })
  updatedBy: { _id: string; email: string };

  @Column({ type: 'jsonb', nullable: true })
  deletedBy: { _id: string; email: string };

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}