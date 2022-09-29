import { Node as PrismaNode } from '@prisma/client';

export class Node implements PrismaNode {
  nodeId: PrismaNode['nodeId'];
  type: PrismaNode['type'];
  userId: PrismaNode['userId'];
  position: PrismaNode['position'];
  createdAt: PrismaNode['createdAt'];
  label: PrismaNode['label'];
}
