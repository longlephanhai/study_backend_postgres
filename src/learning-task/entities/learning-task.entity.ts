import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { LearningStep } from 'src/learning-step/entities/learning-step.entity';

@Entity('learning_tasks')
export class LearningTask {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  type: string;

  @Column('uuid', { array: true })
  content: string[];

  @Column({ default: false })
  isLocked: boolean;

  @Column({ nullable: true })
  relatedStep: number;

  @ManyToOne(() => LearningStep, step => step.tasks)
  @JoinColumn({ name: 'stepId' }) 
  step: LearningStep;

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