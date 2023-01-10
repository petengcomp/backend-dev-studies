import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Content } from "src/content/entities/content.entity";
import { Trail } from "src/trail/entities/trail.entity";
import { User } from "src/user/entities/user.entity";

export default (): TypeOrmModuleOptions => ({
    type: 'sqlite',
    database: './src/database/database.sqlite',
    entities: [Trail, Content, User],
    synchronize: true,  // Change this property to false when you build app for production
})
