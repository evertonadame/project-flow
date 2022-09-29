import { Node, Prisma } from '@prisma/client';
import { IsString } from 'class-validator';

export class NodeCreate implements Prisma.NodeUncheckedCreateInput {
  @IsString()
  type: Prisma.NodeUncheckedCreateInput['type'];

  @IsString()
  userId: Prisma.NodeUncheckedCreateInput['userId'];

  @IsString()
  label: Prisma.NodeUncheckedCreateInput['label'];

  @IsString()
  position: Prisma.NodeUncheckedCreateInput['position'];
}

export class NodeUpdate implements Prisma.NodeUncheckedUpdateInput {
  @IsString()
  nodeId: Prisma.NodeUncheckedCreateInput['nodeId'];
}

export type { Node };
export type NodeDto = Node;
export type NodeCreateDto = InstanceType<typeof NodeCreate>;
export type NodeUpdateDto = InstanceType<typeof NodeUpdate>;
