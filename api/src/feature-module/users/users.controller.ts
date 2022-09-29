import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Request,
  Delete,
  Param,
  ClassSerializerInterceptor,
  UseInterceptors,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto, UserUpdateDto } from './dto/user.dto';
import { formatResponseData } from 'src/helpers/response';
import { ResponseDataDto } from 'src/helpers/types/response.dto';
import { UserEntity } from './types/user.entity.interface';
import { RequestWithUser } from './types/request.with.user';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  async list(): Promise<ResponseDataDto<UserEntity[]>> {
    const users = await this.usersService.findAll();
    return formatResponseData(users);
  }

  // @Public()
  @Post('register')
  create(@Body() createUserDto: UserCreateDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch('me')
  async updateAuthenticatedUser(
    @Request() req: RequestWithUser,
    @Body() updateUserDto: UserUpdateDto,
  ): Promise<ResponseDataDto<UserEntity>> {
    const { user } = req;
    const updatedUser = await this.usersService.updateById(
      user.id,
      updateUserDto,
    );
    return formatResponseData(updatedUser);
  }

  @Get(':id')
  me(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @Delete(':id')
  remove(@Request() req: RequestWithUser, @Param('id') id: string) {
    const { user } = req;
    if (user.id === id) {
      throw new UnauthorizedException(
        formatResponseData({}, false, 'User cant remove your account', 2),
      );
    }

    return this.usersService.removeById(id);
  }
}
