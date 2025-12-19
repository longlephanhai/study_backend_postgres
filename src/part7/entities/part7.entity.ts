import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('part7')
export class Part7 {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ default: 'Part7' })
  type: string;

  @Column('text', { array: true })
  options: string[];

  @Column()
  correctAnswer: string;

  @Column('text')
  explanation: string;

  @Column()
  category: string;

  @Column('text')
  transcript: string;

  @Column('text')
  questionContent: string;

  @Column('text', { array: true, nullable: true })
  reading?: string[];

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
