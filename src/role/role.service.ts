import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import aqp from 'api-query-params';

@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) { }

  async create(createRoleDto: CreateRoleDto, user: IUser) {

    const isExist = await this.roleRepository.findOne({
      where: {
        name: createRoleDto.name
      }
    })
    if (isExist) {
      throw new BadRequestException("Role already exists. Please choose a different name.")
    }

    const newRole = this.roleRepository.create({
      ...createRoleDto,
      createdBy: {
        _id: user._id,
        email: user.email,
      }
    } as any);
    return newRole;
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    const page = +currentPage > 0 ? +currentPage : 1;
    const take = +limit ? +limit : 10;
    const skip = (page - 1) * take;

    // convert sort from api-query-params format (1/-1) to TypeORM order format ('ASC'/'DESC')
    let order: Record<string, 'ASC' | 'DESC'> | undefined = undefined;
    if (sort && typeof sort === 'object') {
      order = Object.fromEntries(
        Object.entries(sort as Record<string, number>).map(([k, v]) => [k, v === -1 ? 'DESC' : 'ASC'])
      ) as Record<string, 'ASC' | 'DESC'>;
    }

    // convert population to relations array if requested
    let relations: string[] | undefined = undefined;
    if (population) {
      if (Array.isArray(population)) {
        relations = population as unknown as string[];
      } else if (typeof population === 'string') {
        relations = [population];
      } else if (typeof population === 'object') {
        relations = Object.keys(population);
      }
    }

    // Use findAndCount for pagination metadata
    const [items, totalItems] = await this.roleRepository.findAndCount({
      where: filter as any,
      skip,
      take,
      order,
      relations,
    });

    const totalPages = Math.ceil(totalItems / take);

    // remove password field before returning
    const result = items.map((u) => {
      const userObj = { ...(u as any) };
      delete userObj.password;
      return userObj;
    });

    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages,  //tổng số trang với điều kiện query
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      result //kết quả query
    }
  }

  findOne(_id: number) {
    return `This action returns a #${_id} role`;
  }

  async update(_id: string, updateRoleDto: UpdateRoleDto, user: IUser) {
    const role = await this.roleRepository.findOne({ where: { _id } });
    if (!role) {
      throw new BadRequestException("Role not found");
    }
    const updateRole = await this.roleRepository.update(_id, {
      ...updateRoleDto,
      updatedBy: {
        _id: user._id,
        email: user.email,
      }
    } as any);
    return updateRole;
  }

  remove(_id: number) {
    return `This action removes a #${_id} role`;
  }
}
