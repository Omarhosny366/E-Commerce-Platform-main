import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
 
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(1024)
  readonly password: string;


    username:string;
    
    role:string;
    
    PhoneNumber:string;
    OTP:string;

}
