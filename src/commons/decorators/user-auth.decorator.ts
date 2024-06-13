import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserAuth } from 'src/middlewares/dto/user-auth.dto';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: UserAuth = request.user;
    if (!user) throw new UnauthorizedException('user not found');
    return user;
  },
);
