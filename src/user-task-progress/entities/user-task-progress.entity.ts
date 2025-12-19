import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { LearningTask } from 'src/learning-task/entities/learning-task.entity';

@Entity('user_task_progress')
export class UserTaskProgress {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => LearningTask, { nullable: false })
  @JoinColumn({ name: 'taskId' })
  task: LearningTask;

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @Column({ type: 'timestamp', nullable: true })
  submittedAt: Date;

  @Column({ type: 'int', default: 0 })
  score: number;

  @Column({ type: 'text', nullable: true })
  feedback: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'jsonb', nullable: true })
  createdBy?: {
    id: string;
    email: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  updatedBy?: {
    id: string;
    email: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  deletedBy?: {
    id: string;
    email: string;
  };

  @Column({ default: false })
  isDeleted: boolean;

  @DeleteDateColumn()
  deletedAt?: Date;
}