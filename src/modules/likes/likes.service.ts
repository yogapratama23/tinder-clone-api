import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikesEntity } from './likes.entity';
import { Repository } from 'typeorm';
import { UserAuth } from 'src/middlewares/dto/user-auth.dto';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikesEntity)
    private likesRepository: Repository<LikesEntity>,
  ) {}

  async create(user: UserAuth) {
    try {
    } catch (e) {
      throw e;
    }
  }
}
