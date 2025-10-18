import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { hashPassword } from 'src/util';
import aqp from 'api-query-params';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) { }

  async registerUser(registerUser: RegisterUserDto) {

    const isExist = await this.usersRepository.findOne({
      where: { email: registerUser.email }
    })

    if (isExist) {
      throw new BadRequestException('Email already exists, please use another one.');
    }

    const hashedPassword = hashPassword(registerUser.password);

    const userRole = await this.rolesRepository.findOne({ where: { name: 'NORMAL_USER' } });

    const newUserEntity = this.usersRepository.create({
      ...registerUser,
      password: hashedPassword,
      role: userRole ?? undefined,
    });

    const newUser = await this.usersRepository.save(newUserEntity);

    return newUser;
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto, user: IUser) {
    const isExist = await this.usersRepository.findOne({
      where: { email: createUserDto.email }
    })
    if (isExist) {
      throw new BadRequestException('Email already exists, please use another one.');
    }

    const hashedPassword = hashPassword(createUserDto.password);

    const newUser = await this.usersRepository.save({
      ...createUserDto,
      role: createUserDto.roleId ? { _id: createUserDto.roleId } as Role : undefined,
      password: hashedPassword,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });

    return newUser._id;
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
    const [items, totalItems] = await this.usersRepository.findAndCount({
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
    return `This action returns a #${_id} user`;
  }

  update(_id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${_id} user`;
  }

  remove(_id: number) {
    return `This action removes a #${_id} user`;
  }
}
