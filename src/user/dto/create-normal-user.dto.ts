import { IsEmail, IsEmpty, IsNotEmpty } from "class-validator"
import { Role } from "../entities/user.entity"

export class CreateNormalUserDto {

    @IsEmpty()
    role: Role = Role.NORMAL_USER

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string
}
