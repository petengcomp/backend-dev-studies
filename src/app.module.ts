import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ContentModule } from './content/content.module';
import { TrailModule } from './trail/trail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import typeormConfig from './config/typeorm.config';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { UserModule } from './user/user.module';
import { AppResolver } from './app.resolver';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(typeormConfig()),
    ContentModule,
    TrailModule,
    UserModule,
    AuthModule,
    MediaModule,
  ],
  providers: [AppResolver],
  // providers: [],
})

export class AppModule {}

