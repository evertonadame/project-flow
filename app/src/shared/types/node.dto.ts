import { Node } from "react-flow-renderer";

export type NodeCreateDto = Node & {
  userId: string;
  title?: string;
};
