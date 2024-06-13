import { IsNotEmpty, IsOptional } from 'class-validator';

export class FindMatchesResponse {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  aboutMe: string;

  @IsNotEmpty()
  age: number;
}
