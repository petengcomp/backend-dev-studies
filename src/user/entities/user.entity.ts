import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum Role {
    ADMIN = "admin",
    NORMAL_USER = "normal_user"
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: string

    @Column({type: 'enum', enum: Role, nullable: false})
    role: Role

    @Column()   
    name: string

    @Column()
    email: string
    
    @Column()
    password: string 
}
