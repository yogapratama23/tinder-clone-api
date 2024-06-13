import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { UsersEntity } from './modules/users/users.entity';
import { NODE_ENV } from './commons/enums/node-env.enum';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { ProfilesEntity } from './modules/profiles/profiles.entity';
import { MatchesModule } from './modules/matches/matches.module';
import { LikesModule } from './modules/likes/likes.module';
import { LikesEntity } from './modules/likes/likes.entity';
import { SwipeLogsEntity } from './modules/matches/swipe-logs.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PSWD,
      database: process.env.DB_NAME,
      entities: [UsersEntity, ProfilesEntity, LikesEntity],
      synchronize: process.env.NODE_ENV === NODE_ENV.DEVELOPMENT,
    }),
    UsersModule,
    ProfilesModule,
    MatchesModule,
    LikesModule,
    SwipeLogsEntity,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('profiles', 'matches');
  }
}
