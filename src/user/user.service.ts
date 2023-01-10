import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { CreateNormalUserDto } from './dto/create-normal-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ){}

  // ============================================================= //
  async createNormalUser(createUserDto: CreateNormalUserDto): Promise<User> {
    
    const isRegistered = await this.findUserByEmail(createUserDto.email);
    
    if(!isRegistered){
      try {
        const user = this.userRepo.create(createUserDto);
        return await  this.userRepo.save(user);
      } catch (error) {
        console.log(error);
        throw new HttpException("Could not register user", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    throw new HttpException("User is already registered", HttpStatus.BAD_REQUEST);
  }

  // ============================================================= //
  async findAll(): Promise<User[]> {
    try {
      return await this.userRepo.find();
    } catch (error) {
      console.log(error);
      throw new HttpException("Could not acces users", HttpStatus.INTERNAL_SERVER_ERROR);  
    }
  }

  // ============================================================= //
  async findOneById(id: number): Promise<User> {

    try {
      return await this.userRepo.findOne({where: {id: id}}) 
    } catch (error) {
      console.log(error);
      throw new HttpException("Could not acces users", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ============================================================= //
  async findUserByEmail(email: string): Promise<User> {

    try {
      return await this.userRepo.findOne({where: {email: email}});
    } catch (error) {
      console.log(error);
      throw new HttpException("Could not acces users", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ============================================================= //
  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    const isRegistered = await this.findOneById(id);

    if(!isRegistered){
      throw new HttpException("User is not registered", HttpStatus.BAD_REQUEST);
    }
    try {
      return await this.userRepo.update(id, updateUserDto);
    } catch (error) {
      console.log(error);
      throw new HttpException("Could not update user", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  // ============================================================= //
  async remove(id: number): Promise<DeleteResult> {
    
    const isRegistered = await this.findOneById(id);

    if(!isRegistered){
      throw new HttpException("User is not registered", HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.userRepo.delete(id); 
    } catch (error) {
      console.log(error);
      throw new HttpException("Could not delete user", HttpStatus.INTERNAL_SERVER_ERROR); 
    }
  }

  async createAdminUser(createUserDto: CreateAdminUserDto): Promise<User> {
    
    const isRegistered = await this.findUserByEmail(createUserDto.email);
    const users = await this.findAll();
    let alreadyHasAdmin: boolean = false;
    
    users.forEach(user => {
      if(user.role == Role.ADMIN){
        alreadyHasAdmin = true;
        return; 
      }
    })

    if(!isRegistered || !alreadyHasAdmin){
      try {
        const user = this.userRepo.create(createUserDto);
        return await  this.userRepo.save(user);
      } catch (error) {
        console.log(error);
        throw new HttpException("Could not register user", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    throw new HttpException("User is already registered", HttpStatus.BAD_REQUEST);
  }

}
