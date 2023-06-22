import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, User } from './entities/user.entity';
import { SilentLoginDto } from './dto/silent-login.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  // ============================================================= //
  async createNormalUser(createUserDto: CreateUserDto): Promise<User> {
    const isRegistered = await this.findUserByEmail(createUserDto.email);

    if (!isRegistered) {
      try {
        createUserDto.role = Role.NORMAL_USER;
        const user = this.userRepo.create(createUserDto);
        return await this.userRepo.save(user);
      } catch (error) {
        console.log(error);
        throw new HttpException(
          'Could not register user',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    throw new HttpException(
      'User is already registered',
      HttpStatus.BAD_REQUEST,
    );
  }

  // ============================================================= //
  async findAll(): Promise<User[]> {
    try {
      return await this.userRepo.find();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Could not acces users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ============================================================= //
  async findOneById(id: number): Promise<User> {
    try {
      return await this.userRepo.findOne({ where: { id: id } });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Could not acces users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ============================================================= //
  async findUserByEmail(email: string): Promise<User> {
    try {
      return await this.userRepo.findOne({ where: { email: email } });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Could not acces users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ============================================================= //
  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    const isRegistered = await this.findOneById(id);

    if (!isRegistered) {
      throw new HttpException('User is not registered', HttpStatus.BAD_REQUEST);
    }
    try {
      return await this.userRepo.update(id, updateUserDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Could not update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ============================================================= //
  async remove(id: number): Promise<DeleteResult> {
    const isRegistered = await this.findOneById(id);

    if (!isRegistered) {
      throw new HttpException('User is not registered', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.userRepo.delete(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Could not delete user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    const isRegistered = await this.findUserByEmail(createUserDto.email);
    const users = await this.findAll();
    let alreadyHasAdmin = false;

    users.forEach((user) => {
      if (user.role == Role.ADMIN) {
        alreadyHasAdmin = true;
        return;
      }
    });

    if (!isRegistered && !alreadyHasAdmin) {
      try {
        createUserDto.role = Role.ADMIN;
        return await this.userRepo.save(createUserDto);
      } catch (error) {
        console.log(error);
        throw new HttpException(
          'Could not register user',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    throw new HttpException(
      'User is already registered',
      HttpStatus.BAD_REQUEST,
    );
  }

  async silentLogin(
    silentLoginDto: SilentLoginDto,
  ): Promise<string | jwt.JwtPayload> {
    try {
      const user = jwt.verify(silentLoginDto.token, 'key');
      return user;
    } catch (err) {
      throw new HttpException('Token is invalid', HttpStatus.BAD_REQUEST);
    }
  }
}
