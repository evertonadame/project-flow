import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Delete,
  Param,
  ClassSerializerInterceptor,
  UseInterceptors,
  Patch,
} from '@nestjs/common';
import { NodeService } from './node.service';
import { formatResponseData } from 'src/helpers/response';
import { ResponseDataDto } from 'src/helpers/types/response.dto';
import { NodeCreateDto } from './dto/node.dto';
import { RequestWithNode } from './types/request.with.node';
import { NodeEntity } from './types/node.entity.interface';
import { NodeUpdateDto } from './types/node-update.interface';

@Controller('nodes')
@UseInterceptors(ClassSerializerInterceptor)
export class NodeController {
  constructor(private readonly nodeService: NodeService) {}

  @Get('/:userId')
  async list(
    @Param('userId') userId: string,
  ): Promise<ResponseDataDto<NodeEntity[]>> {
    const userNodes = await this.nodeService.findAll(userId);
    return formatResponseData(userNodes);
  }

  // @Public()
  @Post('create')
  create(@Body() createUserDto: NodeCreateDto) {
    return this.nodeService.create(createUserDto);
  }

  @Patch('me')
  async updateAuthenticatedUser(
    @Request() req: RequestWithNode,
    @Body() nodeUpdateDto: NodeUpdateDto,
  ): Promise<ResponseDataDto<NodeEntity>> {
    const { node } = req;
    const updatedUser = await this.nodeService.updateById(
      node.nodeId,
      nodeUpdateDto,
    );
    return formatResponseData(updatedUser);
  }

  @Get(':id')
  me(@Request() req: RequestWithNode, @Param('id') id: string) {
    return this.nodeService.getById(id);
  }

  @Delete(':id')
  remove(@Request() req: RequestWithNode, @Param('id') id: string) {
    return this.nodeService.removeById(id);
  }
}
