import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { User } from 'src/commons/decorators/user-auth.decorator';
import { UserAuth } from 'src/middlewares/dto/user-auth.dto';
import { MatchesService } from './matches.service';
import { PaginationOptions } from 'src/commons/helpers/pagination.helper';
import {
  PaginationResponse,
  SuccessResponse,
} from 'src/commons/dto/response.dto';
import { SwipeRightInput } from './dto/swipe-right-input.dto';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}
  @Get('find')
  async potentialMatches(
    @User() user: UserAuth,
    @Query() query: PaginationOptions,
  ): Promise<PaginationResponse> {
    try {
      const data = await this.matchesService.findMatches(user, query);
      return {
        data: data[0],
        page: query.page,
        perPage: query.limit,
        pageCount: Math.ceil(data[1] / query.limit),
        totalCount: data[1],
      };
    } catch (e) {
      throw e;
    }
  }

  @Post('swipe-right')
  async swipeRight(
    @User() user: UserAuth,
    @Body() body: SwipeRightInput,
  ): Promise<SuccessResponse> {
    try {
      const data = await this.matchesService.swipeRight(user, body.userId);
      return { data: data, message: 'swipe right success' };
    } catch (e) {
      throw e;
    }
  }

  @Post('swipe-left')
  async swipeLeft(
    @User() user: UserAuth
  ): Promise<SuccessResponse> {
    try {
      const data = await this.matchesService.swipeLeft(user);
      return { data: data, message: 'swipe left success' };
    } catch (e) {
      throw e;
    }
  }
}
