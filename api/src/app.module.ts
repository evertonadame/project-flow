import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './feature-module/auth/auth.module';
import { NodeModule } from './feature-module/nodes/node.module';
import { UsersModule } from './feature-module/users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, NodeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
