import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuth } from 'src/middlewares/dto/user-auth.dto';
import { ProfilesEntity } from '../profiles/profiles.entity';
import { Repository } from 'typeorm';
import { LikesEntity } from '../likes/likes.entity';
import { PaginationOptions } from 'src/commons/helpers/pagination.helper';
import { SwipeRightResponse } from './dto/swipe-right-response.dto';
import * as dayjs from 'dayjs';
import { SwipeLogsEntity } from './swipe-logs.entity';
import { MEMBERSHIPS } from 'src/commons/enums/membership.enum';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(ProfilesEntity)
    private profilesRepository: Repository<ProfilesEntity>,
    @InjectRepository(LikesEntity)
    private likesRepository: Repository<LikesEntity>,
    @InjectRepository(SwipeLogsEntity)
    private swipeLogsRepository: Repository<SwipeLogsEntity>,
  ) {}
  async findMatches(user: UserAuth, pagination: PaginationOptions) {
    try {
      return await this.profilesRepository
        .createQueryBuilder('profile')
        .leftJoinAndMapMany(
          'profile.likes',
          LikesEntity,
          'likes',
          'profile.userId = likes.likedUser',
        )
        .where('profile.userId != :userId', { userId: user.id })
        .andWhere((sq) => {
          const sub = sq
            .subQuery()
            .from(LikesEntity, 'like')
            .where('like.userId = :uid', { uid: user.id })
            .select('like.likedUser')
            .getQuery();
          return 'profile.userId NOT IN ' + sub;
        })
        .select([
          'profile.id',
          'profile.userId',
          'profile.fullName',
          'profile.birthday',
          'profile.aboutMe',
          'likes.id',
          'likes.userId',
        ])
        .skip((pagination.page - 1) * pagination.limit)
        .take(pagination.limit)
        .getManyAndCount();
    } catch (e) {
      throw e;
    }
  }

  async swipeRight(
    user: UserAuth,
    userId: number,
  ): Promise<SwipeRightResponse> {
    try {
      const checkSwipeLogs = await this.swipeLogsRepository
        .createQueryBuilder('swl')
        .where('swl.userId = :userId', { userId: user.id })
        .andWhere('swl.createdAt BETWEEN :start AND :end', {
          start: dayjs().startOf('day').toDate(),
          end: dayjs().endOf('day').toDate(),
        })
        .getCount();
      
      if (user.membership === MEMBERSHIPS.BASIC) {
        if (checkSwipeLogs >= 10) {
          throw new UnprocessableEntityException('upgrade your membership to have infinite swipes everyday');
        }
      }

      const checkLiked = await this.likesRepository
        .createQueryBuilder('like')
        .where('like.userId = :userId', { userId })
        .andWhere('like.likedUser = :likedUser', { likedUser: user.id })
        .getOne();

      const liked = this.likesRepository.create({
        userId: user.id,
        likedUser: userId,
      });
      const swipeLog = this.swipeLogsRepository.create({
        userId: user.id,
      });

      await Promise.all([
        this.likesRepository.save(liked),
        this.swipeLogsRepository.save(swipeLog),
      ]);

      return {
        isMatch: checkLiked ? true : false,
      };
    } catch (e) {
      throw e;
    }
  }

  async swipeLeft(user: UserAuth): Promise<void> {
    try {
      const checkSwipeLogs = await this.swipeLogsRepository
        .createQueryBuilder('swl')
        .where('swl.userId = :userId', { userId: user.id })
        .andWhere('swl.createdAt BETWEEN :start AND :end', {
          start: dayjs().startOf('day').toDate(),
          end: dayjs().endOf('day').toDate(),
        })
        .getCount();
      
      if (user.membership === MEMBERSHIPS.BASIC) {
        if (checkSwipeLogs >= 10) {
          throw new UnprocessableEntityException('upgrade your membership to have infinite swipes everyday');
        }
      }

      const swipeLog = this.swipeLogsRepository.create({
        userId: user.id,
      });

      await this.swipeLogsRepository.save(swipeLog);

      return;
    } catch (e) {
      throw e;
    }
  }
}
