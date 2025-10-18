import { Vocabulary } from 'src/vocabularies/entities/vocabulary.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('topics_vocabularies')
export class TopicsVocabulary {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  topic: string;

  @Column()
  description: string;

  @ManyToMany(() => Vocabulary, (vocab) => vocab.topics, {
    cascade: true,
  })
  @JoinTable({
    name: 'topics_vocabularies_vocabularies', // tên bảng trung gian
    joinColumn: { name: 'topic_id', referencedColumnName: '_id' },
    inverseJoinColumn: { name: 'vocabulary_id', referencedColumnName: '_id' },
  })
  vocabularies: Vocabulary[];

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
