import { IsNotEmpty } from 'class-validator';
import { MEMBERSHIPS } from 'src/commons/enums/membership.enum';

export class UserAuth {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  membership: MEMBERSHIPS;
}
