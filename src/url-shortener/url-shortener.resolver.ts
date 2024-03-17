import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UrlShortenerService } from './url-shortener.service';

@Resolver()
export class UrlShortenerResolver {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Query(() => String)
  async testQuery(): Promise<string> {
    return 'This is a test query';
  }

  @Mutation(() => String)
  async shorten(@Args('originalUrl') originalUrl: string): Promise<string> {
    return this.urlShortenerService.shorten(originalUrl);
  }

  @Query(() => String)
  async redirect(@Args('shortUrl') shortUrl: string): Promise<string> {
    return this.urlShortenerService.redirect(shortUrl);
  }
}
