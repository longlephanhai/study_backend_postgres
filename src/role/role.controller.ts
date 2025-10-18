import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ResponseMessage, User } from 'src/decorator/customize';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post()
  @ResponseMessage("Create role successfully")
  create(@Body() createRoleDto: CreateRoleDto, @User() user: IUser) {
    return this.roleService.create(createRoleDto, user);
  }

  @Get()
  @ResponseMessage("Get all role with pagination")
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string) {
    return this.roleService.findAll(+currentPage, +limit, qs);
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.roleService.findOne(+_id);
  }

  @Patch(':_id')
  @ResponseMessage("Update role successfully")
  update(@Param('_id') _id: string, @Body() updateRoleDto: UpdateRoleDto, @User() user: IUser) {
    return this.roleService.update(_id, updateRoleDto, user);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.roleService.remove(+_id);
  }
}
