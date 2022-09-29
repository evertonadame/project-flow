import { Prisma, User } from '@prisma/client';
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';
export class UserCreate implements Prisma.UserCreateInput {
  @IsString()
  @IsEmail()
  email: Prisma.UserCreateInput['email'];

  @IsString()
  @MinLength(3)
  name: Prisma.UserCreateInput['name'];

  @IsString()
  @MinLength(3)
  password: Prisma.UserCreateInput['password'];
}

export class UserUpdate implements Prisma.UserUncheckedUpdateInput {
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: Prisma.UserCreateInput['email'];

  @IsString()
  @MinLength(3)
  @IsOptional()
  name?: Prisma.UserCreateInput['name'];
}

export type { User };
export type UserDto = User;
export type UserCreateDto = InstanceType<typeof UserCreate>;
export type UserUpdateDto = InstanceType<typeof UserUpdate>;
