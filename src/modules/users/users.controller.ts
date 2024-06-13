import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupInput } from './dto/signup-input.dto';
import { SuccessResponse } from 'src/commons/dto/response.dto';
import { LoginInput } from './dto/login-input.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() body: SignupInput): Promise<SuccessResponse> {
    try {
      const data = await this.usersService.signUp(body);
      return { data: data, message: 'signup success' };
    } catch (e) {
      throw e;
    }
  }

  @Post('login')
  async login(@Body() body: LoginInput): Promise<SuccessResponse> {
    try {
      const data = await this.usersService.login(body);
      return { data: data, message: 'login success' };
    } catch (e) {
      throw e;
    }
  }
}
