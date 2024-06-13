import { IsJWT, IsNotEmpty } from 'class-validator';

export class LoginResponse {
  @IsNotEmpty()
  @IsJWT()
  accessToken: string;
}
