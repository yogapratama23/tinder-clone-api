import { IsNotEmpty } from 'class-validator';

export class SignupInput {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
