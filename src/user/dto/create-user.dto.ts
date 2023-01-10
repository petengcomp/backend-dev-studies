import { IsEmail, IsEmpty, IsNotEmpty } from "class-validator"
import { Role } from "../entities/user.entity"

export class CreateUserDto {

    @IsEmpty()
    role: Role

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string
}
