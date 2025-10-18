import { Permission } from 'src/permissions/entities/permission.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';


@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  // Nhiều role có thể có nhiều permission
  @ManyToMany(() => Permission, { eager: true })
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'permission_id' },
  })
  permissions: Permission[];

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
