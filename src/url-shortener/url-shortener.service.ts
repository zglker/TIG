import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { randomBytes } from 'crypto';
import Redis from 'ioredis';

@Injectable()
export class UrlShortenerService {
  redisClient: any;
  constructor(protected prisma: PrismaService) {
    this.redisClient = new Redis({
      host: 'redis', // Use environment variables or configuration files for host and port
      port: 6379,
    });
  }

  async shorten(originalUrl: string): Promise<string> {
    let res;
    //check if originalUrl exist
    const record = await this.prisma.shortUrl.findUnique({
      where: {
        originalUrl: originalUrl,
      },
    });
    if (record) {
      res = record.shortUrl;
    } else {
      const shortCode = this.generateShortKey();
      const shortUrl = process.env.DOMAIN_NAME + `${shortCode}`;

      await this.prisma.shortUrl.create({
        data: {
          originalUrl,
          shortUrl,
        },
      });
      res = shortUrl;
    }
    // Add to cache
    await this.redisClient.setex(originalUrl, 60 * 60 * 24, res); // cache for 24 hours
    return res;
  }

  async redirect(shortUrl: string): Promise<string> {
    // Check cache first
    const cacheHit = await this.redisClient.get(shortUrl);
    if (cacheHit) {
      return cacheHit;
    }
    const urlMapping = await this.prisma.shortUrl.findUnique({
      where: { shortUrl },
    });

    if (!urlMapping) {
      throw new Error('URL not found');
    }
    // Update cache
    await this.redisClient.setex(
      shortUrl,
      60 * 60 * 24,
      urlMapping.originalUrl,
    ); // cache for 24 hours
    return urlMapping.originalUrl;
  }

  generateShortKey(): string {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const keyLength = 6;
    let shortKey = '';

    const randomBuffer = randomBytes(keyLength);

    for (let i = 0; i < keyLength; i++) {
      const randomIndex = randomBuffer[i] % charset.length;
      shortKey += charset[randomIndex];
    }

    return shortKey;
  }
}
