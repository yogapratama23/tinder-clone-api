import { IsOptional } from 'class-validator';

export class FindUserInput {
  @IsOptional()
  id?: number;

  @IsOptional()
  username?: string;
}
