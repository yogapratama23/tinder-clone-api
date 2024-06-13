import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { GENDER } from 'src/commons/enums/gender.enum';

export class CreateProfileInput {
  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  imageUrl: string;

  @IsNotEmpty()
  birthday: Date;

  @IsOptional()
  aboutMe: string;

  @IsNotEmpty()
  @IsEnum(GENDER)
  gender: GENDER;

  @IsNotEmpty()
  @IsEnum(GENDER)
  interestedGender: GENDER;
}
