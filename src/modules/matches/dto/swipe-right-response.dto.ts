import { IsNotEmpty } from 'class-validator';

export class SwipeRightResponse {
  @IsNotEmpty()
  isMatch: boolean;
}
