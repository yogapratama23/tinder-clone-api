import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfilesEntity } from './profiles.entity';
import { Repository } from 'typeorm';
import { CreateProfileInput } from './dto/create-profile-input.dto';
import { UserAuth } from 'src/middlewares/dto/user-auth.dto';
import { UsersEntity } from '../users/users.entity';
import { MEMBERSHIPS } from 'src/commons/enums/membership.enum';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfilesEntity)
    private profilesRepository: Repository<ProfilesEntity>,
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async create(
    userAuth: UserAuth,
    input: CreateProfileInput,
  ): Promise<ProfilesEntity> {
    try {
      const checkProfile = await this.findProfile(userAuth.id);
      if (checkProfile) {
        throw new UnprocessableEntityException('profile already exist');
      }

      const profile = this.profilesRepository.create({
        userId: userAuth.id,
        fullName: input.fullName,
        birthday: input.birthday,
        aboutMe: input.aboutMe,
        gender: input.gender,
        interestedGender: input.interestedGender,
      });

      return this.profilesRepository.save(profile);
    } catch (e) {
      throw e;
    }
  }

  async findProfile(userId: number): Promise<ProfilesEntity> {
    try {
      return this.profilesRepository
        .createQueryBuilder('profile')
        .where('profile.userId = :userId', { userId })
        .getOne();
    } catch (e) {
      throw e;
    }
  }

  async update(
    userAuth: UserAuth,
    input: Partial<CreateProfileInput>,
  ): Promise<ProfilesEntity> {
    try {
      const checkProfile = await this.findProfile(userAuth.id);
      if (!checkProfile) {
        throw new UnprocessableEntityException('profile not found');
      }

      if (input.fullName) checkProfile.fullName = input.fullName;
      if (input.birthday) checkProfile.birthday = input.birthday;
      if (input.aboutMe) checkProfile.aboutMe = input.aboutMe;
      if (input.gender) checkProfile.gender = input.gender;
      if (input.interestedGender)
        checkProfile.interestedGender = input.interestedGender;

      return this.profilesRepository.save(checkProfile);
    } catch (e) {
      throw e;
    }
  }

  async upgradeMembership(user: UserAuth): Promise<UsersEntity> {
    try {
      const checkUser = await this.usersRepository.createQueryBuilder('user')
        .where('user.id = :id', { id: user.id })
        .getOne();
      checkUser.membership = MEMBERSHIPS.PREMIUM;

      if (!checkUser) {
        throw new UnprocessableEntityException('user not found');
      }

      return this.usersRepository.save(checkUser);
    } catch (e) {
      throw e;
    }
  }
}
