import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { User } from 'src/commons/decorators/user-auth.decorator';
import { UserAuth } from 'src/middlewares/dto/user-auth.dto';
import { CreateProfileInput } from './dto/create-profile-input.dto';
import { SuccessResponse } from 'src/commons/dto/response.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  async create(
    @User() user: UserAuth,
    @Body() body: CreateProfileInput,
  ): Promise<SuccessResponse> {
    try {
      const data = await this.profilesService.create(user, body);
      return { data: data, message: 'create profile success' };
    } catch (e) {
      throw e;
    }
  }

  @Patch()
  async update(
    @User() user: UserAuth,
    @Body() body: Partial<CreateProfileInput>,
  ) {
    try {
      const data = await this.profilesService.update(user, body);
      return { data: data, message: 'update profile success' };
    } catch (e) {
      throw e;
    }
  }

  @Get()
  async profile(@User() user: UserAuth): Promise<SuccessResponse> {
    try {
      const data = await this.profilesService.findProfile(user.id);
      return { data: data, message: 'get profile success' };
    } catch (e) {
      throw e;
    }
  }

  @Post('upgrade')
  async upgradeMembership(@User() user: UserAuth) {
    try {
      const data = await this.profilesService.upgradeMembership(user);
      return { data: data, message: 'upgrade membership success' };
    } catch (e) {
      throw e;
    }
  }
}
