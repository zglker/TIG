import { Test, TestingModule } from '@nestjs/testing';
import { UrlShortenerService } from './url-shortener.service';
import { PrismaService } from '../prisma.service';

describe('UrlShortenerService', () => {
  let service: UrlShortenerService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlShortenerService, PrismaService],
    }).compile();

    service = module.get<UrlShortenerService>(UrlShortenerService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

//   describe('shorten', () => {
//     it('should return a short URL if not in cache or database', async () => {
//       const originalUrl = 'https://example.com';
//       const shortCode = 'abcdef';
//       const expectedShortUrl = process.env.DOMAIN_NAME + shortCode;

//       jest.spyOn(prismaService.shortUrl, 'findUnique').mockResolvedValue(null);
//       jest.spyOn(service.redisClient, 'get').mockResolvedValue(null);
//       jest.spyOn(service.redisClient, 'setex').mockResolvedValue(true);
//       jest.spyOn(prismaService.shortUrl, 'create').mockResolvedValue({
//         id: 'test-id',
//         originalUrl,
//         shortUrl: expectedShortUrl,
//         createdAt: new Date(),
//       });

//       const result = await service.shorten(originalUrl);

//       expect(result).toBe(expectedShortUrl);
//     });

//     it('should return the cached short URL if available', async () => {
//       const originalUrl = 'https://example.com';
//       const cachedShortUrl = process.env.DOMAIN_NAME + 'cachedUrl';

//       jest.spyOn(prismaService.shortUrl, 'findUnique').mockResolvedValue(null);
//       jest.spyOn(service.redisClient, 'get').mockResolvedValue(cachedShortUrl);

//       const result = await service.shorten(originalUrl);

//       expect(result).toBe(cachedShortUrl);
//     });

//     it('should return the short URL from the database if not in cache', async () => {
//       const originalUrl = 'https://example.com';
//       const shortCode = 'abcdef';
//       const expectedShortUrl = process.env.DOMAIN_NAME + shortCode;

//         jest.spyOn(prismaService.shortUrl, 'findUnique').mockResolvedValue({
//           id: 'test-id2',
//           originalUrl,
//           shortUrl: expectedShortUrl,
//           createdAt: new Date(),
//         });

//       const result = await service.shorten(originalUrl);

//       expect(result).toBe(expectedShortUrl);
//     });
//   });

//   describe('redirect', () => {
//     it('should return the original URL for a given short URL if in cache', async () => {
//       const shortUrl = 'http://yourdomain.com/abcdef';
//       const originalUrl = 'https://example.com';

//       jest.spyOn(service.redisClient, 'get').mockResolvedValue(originalUrl);

//       const result = await service.redirect(shortUrl);

//       expect(result).toBe(originalUrl);
//     });

//     it('should return the original URL for a given short URL if in database', async () => {
//       const shortUrl = 'http://yourdomain.com/abcdef';
//       const originalUrl = 'https://example.com';

//       jest.spyOn(service.redisClient, 'get').mockResolvedValue(null);
   

//       const result = await service.redirect(shortUrl);

//       expect(result).toBe(originalUrl);
//     });

//     it('should throw an error for an unknown short URL', async () => {
//       const shortUrl = 'http://yourdomain.com/unknown';

//       jest.spyOn(service.redisClient, 'get').mockResolvedValue(null);
//       jest.spyOn(prismaService.shortUrl, 'findUnique').mockResolvedValue(null);

//       await expect(service.redirect(shortUrl)).rejects.toThrow('URL not found');
//     });
//   });
});
