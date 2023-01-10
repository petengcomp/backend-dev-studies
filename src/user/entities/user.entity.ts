import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
    ADMIN = "admin",
    NORMAL_USER = "normal_user"
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    role: Role

    @Column()   
    name: string

    @Column()
    email: string
    
    @Column()
    password: string 
}
