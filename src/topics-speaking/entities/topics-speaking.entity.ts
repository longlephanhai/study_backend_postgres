import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('topics_speaking')
export class TopicsSpeaking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  topic: string;

  @Column('text')
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('jsonb', { nullable: true })
  createdBy?: {
    _id: string;
    email: string;
  };

  @Column('jsonb', { nullable: true })
  updatedBy?: {
    _id: string;
    email: string;
  };

  @Column('jsonb', { nullable: true })
  deletedBy?: {
    _id: string;
    email: string;
  };

  @Column({ default: false })
  isDeleted: boolean;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
