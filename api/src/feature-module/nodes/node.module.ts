import { Global, Module } from '@nestjs/common';
import { NodeController } from './node.controller';
import { NodeService } from './node.service';

@Global()
@Module({
  controllers: [NodeController],
  providers: [NodeService],
  exports: [NodeService],
})
export class NodeModule {}
