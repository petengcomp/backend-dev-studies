import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateNormalUserDto } from './dto/create-normal-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RoleGuard, Roles } from 'src/auth/role.guard';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UseGuards(JwtGuard, new RoleGuard(Roles.ADMIN))
  async createNormalUser(@Body() createUserDto: CreateNormalUserDto) {
    try {
      return await this.userService.createNormalUser(createUserDto);
    } catch (e) {
      throw e;
    }
  }

  @Get('get-all')
  @UseGuards(JwtGuard, new RoleGuard(Roles.ADMIN))
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (e) {
      throw e;
    }
  }

  @Get('get-one-by-id/:id')
  @UseGuards(JwtGuard, new RoleGuard(Roles.ADMIN))
  async findOneById(@Param('id') id: string) {
    try {
      return await this.userService.findOneById(+id);
    } catch (e) {
      throw e;    
    }
  }

  @Get('get-one-by-email/:email')
  @UseGuards(JwtGuard, new RoleGuard(Roles.ADMIN))
  async findOneByEmail(@Param() email: string) {
    try {
      return await this.userService.findUserByEmail(email);
    } catch (e) {
      throw e;
    }
  }

  @Patch(':id')
  @UseGuards(JwtGuard, new RoleGuard(Roles.ADMIN))
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.userService.update(+id, updateUserDto);
    } catch (e) {
      throw e;
    }
  }

  @Delete(':id')
  @UseGuards(JwtGuard, new RoleGuard(Roles.ADMIN))
  async remove(@Param('id') id: string) {
    try {
      return await this.userService.remove(+id);
    } catch (e) {
      throw e;
    }
  }

  // =================================================== //
  @Post('register-admin')
  async createAdminUser(@Body() createAdminUserDto: CreateAdminUserDto) {
    try {
      return await this.userService.createAdminUser(createAdminUserDto);
    } catch (e) {
      throw e;
    }
  } 
}
