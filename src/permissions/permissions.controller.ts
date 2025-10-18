import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ResponseMessage, User } from 'src/decorator/customize';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) { }

  @Post()
  @ResponseMessage("Create permission successfully")
  create(@Body() createPermissionDto: CreatePermissionDto, @User() user: IUser) {
    return this.permissionsService.create(createPermissionDto, user);
  }

  @Get()
  @ResponseMessage("Get all permissions with pagination")
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string) {
    return this.permissionsService.findAll(+currentPage, +limit, qs);
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.permissionsService.findOne(+_id);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.update(+_id, updatePermissionDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.permissionsService.remove(+_id);
  }
}
