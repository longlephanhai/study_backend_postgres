import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'surveys' })
export class Survey {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ nullable: false })
  userId: string; 

  @Column({ nullable: false })
  toeicHistory: string;

  @Column({ nullable: false })
  readingLevel: string;

  @Column({ nullable: false })
  listeningLevel: string;

  @Column({ nullable: false })
  vocabularyLevel: string;

  @Column({ nullable: false })
  targetScore: number;

  @Column({ nullable: false })
  focus: string;

  @Column({ nullable: false })
  purpose: string;

  @Column({ nullable: false })
  studyTimePerDay: string;

  @Column({ nullable: false })
  studyTimePerWeek: string;

  @Column({ nullable: false })
  examGoal: string;

  @Column({ nullable: false })
  learningStyle: string;

  @Column({ nullable: false })
  studyPreference: string;

  @Column({ nullable: false })
  mentorSupportType: string;

  @Column({ nullable: false })
  occupation: string;

  @Column({ nullable: false })
  preferredStudyTime: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'json', nullable: true })
  createdBy: { _id: string; email: string };

  @Column({ type: 'json', nullable: true })
  updatedBy: { _id: string; email: string };

  @Column({ type: 'json', nullable: true })
  deletedBy: { _id: string; email: string };

  @Column({ default: false })
  isDeleted: boolean;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}
