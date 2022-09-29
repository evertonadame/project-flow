import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NodeCreateDto } from './dto/node.dto';
import { NodeUpdateDto } from './types/node-update.interface';
import { NodeEntity } from './types/node.entity.interface';

@Injectable()
export class NodeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNodeDto: NodeCreateDto): Promise<NodeEntity> {
    const data = await this.prisma.node.create({
      data: createNodeDto,
    });
    return data;
  }

  async updateById(
    nodeId: string,
    nodeUpdateDto: NodeUpdateDto,
  ): Promise<NodeEntity> {
    const data = await this.prisma.node.update({
      where: {
        nodeId,
      },
      data: nodeUpdateDto,
    });
    return data;
  }

  async findAll(userId): Promise<NodeEntity[]> {
    const items = await this.prisma.node.findMany({
      where: { userId: userId },
    });

    return Promise.all(
      items.map(async (data) => {
        return data;
      }),
    );
  }

  async getById(nodeId: string): Promise<NodeEntity> {
    const data = await this.prisma.node.findFirst({
      where: {
        nodeId,
      },
    });

    return data;
  }

  async removeById(nodeId: string): Promise<NodeEntity> {
    const data = await this.prisma.node.delete({
      where: {
        nodeId,
      },
    });

    return data;
  }
}
