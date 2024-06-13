import { IsNotEmpty } from 'class-validator';

export class PaginationOptions {
  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  limit: number;
}
