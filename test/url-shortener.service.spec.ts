import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma.service';
import { UrlShortenerService } from 'src/url-shortener/url-shortener.service';

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

  describe('shorten', () => {
    it('should return a short URL', async () => {
      const originalUrl = 'https://example.com';
      const shortUrl = 'http://yourdomain.com/abcdef';

      jest
        .spyOn(prismaService.shortUrl, 'findUniqueOrThrow')
        .mockResolvedValue(null);
      jest.spyOn(prismaService.shortUrl, 'create').mockResolvedValue({
        id: 'test_shortUrlId', 
        originalUrl,
        shortUrl,
        createdAt: new Date(),
      });

      expect(await service.shorten(originalUrl)).toBe(shortUrl);
    });
  });

  describe('redirect', () => {
    it('should return the original URL for a given short URL', async () => {
      const originalUrl = 'https://example.com';
      const shortUrl = 'http://yourdomain.com/abcdef';

      jest.spyOn(prismaService.shortUrl, 'findUnique').mockResolvedValue({
        id: 'test_shortUrlId1', // more meaningful mock ID
        originalUrl,
        shortUrl,
        createdAt: new Date(),
      });

      expect(await service.redirect(shortUrl)).toBe(originalUrl);
    });

    it('should throw an error if the short URL is not found', async () => {
      const shortUrl = 'http://yourdomain.com/unknown';

      jest.spyOn(prismaService.shortUrl, 'findUnique').mockResolvedValue(null);

      await expect(service.redirect(shortUrl)).rejects.toThrow('URL not found');
    });
  });
});
