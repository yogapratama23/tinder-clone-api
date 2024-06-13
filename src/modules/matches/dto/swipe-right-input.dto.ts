import { IsNotEmpty } from 'class-validator';

export class SwipeRightInput {
  @IsNotEmpty()
  userId: number;
}
