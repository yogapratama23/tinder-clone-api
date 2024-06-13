import { IsNotEmpty } from 'class-validator';

export class LoginInput {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
