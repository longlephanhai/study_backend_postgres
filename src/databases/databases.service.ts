import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/users/entities/user.entity';

import { Repository } from 'typeorm';
import { ADMIN_ROLE, INIT_PERMISSIONS, USER_ROLE } from './sample.data';
import { hashPassword } from 'src/util';

@Injectable()
export class DatabasesService implements OnModuleInit {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
    private configService: ConfigService,
  ) { }

  async onModuleInit() {
    const isInit = this.configService.get<string>('SHOULD_INIT');
    if (Boolean(isInit)) {
      const countUser = await this.userRepository.count();
      const countPermission = await this.permissionRepository.count();
      const countRole = await this.roleRepository.count();

      // create permissions
      if (countPermission === 0) {
        const permissionsToSave = INIT_PERMISSIONS.map(p => {
          const { _id, __v, deletedAt, createdAt, updatedAt, ...rest } = p as any;
          return {
            ...rest,
            deletedAt: deletedAt ?? undefined,
            createdAt: createdAt ? new Date(createdAt) : undefined,
            updatedAt: updatedAt ? new Date(updatedAt) : undefined,
          } as Partial<Permission>;
        });
        await this.permissionRepository.save(permissionsToSave);
      }
      // create roles
      if (countRole === 0) {
        const permissions = await this.permissionRepository.find();
        await this.roleRepository.save([
          {
            name: ADMIN_ROLE,
            description: "System admin, has all rights",
            isActive: true,
            permissions: permissions
          },
          {
            name: USER_ROLE,
            description: "Users using the system",
            isActive: true,
            permissions: []
          }
        ])
      }
      // create admin and user
      if (countUser === 0) {
        const adminRole = await this.roleRepository.findOne({ where: { name: ADMIN_ROLE } });
        const userRole = await this.roleRepository.findOne({ where: { name: USER_ROLE } });
        await this.userRepository.save([
          {
            fullName: "ADMIN",
            age: 20,
            email: "admin@gmail.com",
            password: hashPassword(this.configService.get<string>('INIT_PASSWORD')!),
            phone: "0377651138",
            address: "Đà Nẵng",
            role: adminRole ?? undefined,
            avatar: "Hải Long-1756430446516.jpeg"
          },
          {
            fullName: "USER",
            age: 20,
            email: "user@gmail.com",
            password: hashPassword(this.configService.get<string>('INIT_PASSWORD')!),
            phone: "0377651138",
            address: "Đà Nẵng",
            role: userRole ?? undefined,
            avatar: "Hải Long-1756430446516.jpeg"
          }
        ])
      }

      if (countUser > 0 && countRole > 0 && countPermission > 0) {
        console.log("Database initialized already. To re-initialize, please clear the database and set SHOULD_INIT to true in the .env file")
      }
    }
  }
}
