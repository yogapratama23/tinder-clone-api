import { IsNotEmpty, IsOptional } from 'class-validator';

export class SuccessResponse {
  message: string;
  data: any;
}

export class PaginationResponse {
  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  perPage: number;

  @IsNotEmpty()
  pageCount: number;

  @IsNotEmpty()
  totalCount: number;

  @IsOptional()
  data: any;
}
