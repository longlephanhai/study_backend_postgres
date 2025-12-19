import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('part2')
export class Part2 {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ default: 'Part2' })
  type: string;

  @Column()
  audioUrl: string;

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
