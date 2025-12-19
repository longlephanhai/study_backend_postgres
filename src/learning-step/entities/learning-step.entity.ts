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
import { LearningPath } from 'src/learning-path/entities/learning-path.entity';
import { LearningTask } from 'src/learning-task/entities/learning-task.entity';

@Entity('learning_steps')
export class LearningStep {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  order: number;

  @ManyToOne(() => LearningPath, path => path.steps)
  @JoinColumn({ name: 'learningPathId' })
  learningPath: LearningPath;

  @OneToMany(() => LearningTask, task => task.step, {
    cascade: true,
  })
  tasks: LearningTask[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  unlockAt: Date;

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