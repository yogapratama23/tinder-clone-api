import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesEntity } from './likes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikesEntity])],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
