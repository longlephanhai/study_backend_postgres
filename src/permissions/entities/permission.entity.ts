import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'permissions' })
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  apiPath: string;

  @Column({ nullable: false })
  method: string;

  @Column({ nullable: false })
  module: string;

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
