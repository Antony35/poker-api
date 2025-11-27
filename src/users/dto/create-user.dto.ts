import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4, {message: 'Password must be at least 4 characters'})
  readonly password: string;
}