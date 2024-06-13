import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { UserAuth } from './dto/user-auth.dto';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException('invalid authorization');
    }

    const [ignored, token] = authorization.split(' ');
    if (!token) {
      throw new UnauthorizedException('invalid authorization');
    }

    const { username } = await this.jwtService.verifyAsync(token);
    if (!username) {
      throw new UnauthorizedException('invalid authorization');
    }

    const checkUser = await this.usersService.findUser({ username });
    if (!checkUser) {
      throw new UnauthorizedException('invalid authorization');
    }

    const user: UserAuth = {
      id: checkUser.id,
      username: checkUser.username,
      membership: checkUser.membership,
    };

    req['user'] = user;

    next();
  }
}
