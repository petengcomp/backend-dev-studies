import { Column, Entity } from "typeorm";

@Entity()
export class User {

    @Column()
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
