import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserCreateDto, UserUpdateDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './types/user.entity.interface';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: UserCreateDto): Promise<UserEntity> {
    const { email } = createUserDto;
    const userAredlyExists = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAredlyExists) {
      throw new UnauthorizedException({
        message: 'user already exists',
        error: 400,
        statusCode: 400,
      });
    }

    if (!userAredlyExists) {
      const data = await this.prisma.user.create({
        data: createUserDto,
        include: {
          nodes: true,
        },
      });

      return data;
    }
  }

  async findAll(): Promise<UserEntity[]> {
    const items = await this.prisma.user.findMany({});

    return Promise.all(
      items.map(async (data) => {
        return data;
      }),
    );
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const data = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    return data;
  }

  async getById(id: string): Promise<UserEntity> {
    const data = await this.prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        nodes: true,
      },
    });

    return data;
  }

  async updateById(
    id: string,
    updateUserDto: UserUpdateDto,
  ): Promise<UserEntity> {
    const data = await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });

    return data;
  }

  async removeById(id: string): Promise<UserEntity> {
    const data = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return data;
  }
}
