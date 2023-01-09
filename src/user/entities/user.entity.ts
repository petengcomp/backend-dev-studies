import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: string
    
    @Column()
    isAdmin: boolean

    @Column()
    name: string

    @Column()
    email: string
    
    @Column()
    password: string 
}
