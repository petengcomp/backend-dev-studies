import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ContentModule } from './content/content.module';
import { TrailModule } from './trail/trail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import typeormConfig from './config/typeorm.config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot(typeormConfig()),
    ContentModule,
    TrailModule,
  ],
  // providers: [],
})

export class AppModule {}
