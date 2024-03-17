import { Module } from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';
import { UrlShortenerResolver } from './url-shortener.resolver';
import { PrismaModule } from './prisma.module';

@Module({
  providers: [UrlShortenerService, UrlShortenerResolver],
})
@Module({
  imports: [PrismaModule],
  providers: [UrlShortenerService, UrlShortenerResolver],
})
export class UrlShortenerModule {}
