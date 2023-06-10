import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RoleGuard, Roles } from 'src/auth/role.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { SilentLoginDto } from './dto/silent-login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register-normal-user')
  @UseGuards(JwtGuard, new RoleGuard(Roles.ADMIN))
  async createNormalUser(@Body() createUserDto: CreateUserDto) {
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

  @Delete('delete/:id')
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
  async createAdminUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.createAdminUser(createUserDto);
    } catch (e) {
      throw e;
    }
  }

  @Post('silent-login')
  async silentLogin(@Body() silentLogin: SilentLoginDto) {
    try {
      return await this.userService.silentLogin(silentLogin);
    } catch (e) {
      throw e;
    }
  }
}
