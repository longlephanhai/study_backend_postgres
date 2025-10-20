import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Writing } from 'src/writing/entities/writing.entity';

@Entity('writing_histories')
export class WritingHistory {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ name: 'userId' })
  userId: string;


  @ManyToOne(() => Writing, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'writingId' })
  writingId: Writing;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'jsonb', nullable: true })
  feedback: WritingFeedback;

  @Column({ type: 'jsonb', nullable: true })
  score: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'jsonb', nullable: true })
  createdBy: {
    _id: string;
    email: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  updatedBy: {
    _id: string;
    email: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  deletedBy: {
    _id: string;
    email: string;
  };

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
