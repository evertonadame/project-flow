import { Request } from 'express';
import { Node } from '../entities/nodes.entity';

export interface RequestWithNode extends Request {
  node: Node;
}
