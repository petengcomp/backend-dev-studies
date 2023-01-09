import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default (): TypeOrmModuleOptions => ({
    type: 'sqlite',
    database: './src/database/database.sqlite',
    entities: [__dirname + '*/**/*.entity{.ts,.js}'],
    synchronize: true,
})
