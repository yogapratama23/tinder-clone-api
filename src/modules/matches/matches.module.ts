import { Module } from '@nestjs/common';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesEntity } from '../profiles/profiles.entity';
import { LikesEntity } from '../likes/likes.entity';
import { SwipeLogsEntity } from './swipe-logs.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfilesEntity, LikesEntity, SwipeLogsEntity]),
  ],
  controllers: [MatchesController],
  providers: [MatchesService],
})
export class MatchesModule {}
