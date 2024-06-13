import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesEntity } from './profiles.entity';
import { UsersEntity } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfilesEntity, UsersEntity])],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
