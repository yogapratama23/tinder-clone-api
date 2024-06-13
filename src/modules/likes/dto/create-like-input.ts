import { IsNotEmpty } from 'class-validator';

export class CreateLikeInput {
  @IsNotEmpty()
  likedUser: number;
}
