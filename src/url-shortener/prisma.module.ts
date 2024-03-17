import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Export PrismaService so it can be injected elsewhere
})
export class PrismaModule {}
