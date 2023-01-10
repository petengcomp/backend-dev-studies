import { IsEmail, IsEmpty, IsNotEmpty } from "class-validator"
import { Role } from "../entities/user.entity"

export class CreateAdminUserDto {

    @IsEmpty()
    role: Role = Role.ADMIN

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string
}
