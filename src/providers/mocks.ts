import { IMetadataProvider, IArtworkProvider, IStoreProvider, INewsProvider, IRecommendationProvider, StoreOffer, NewsArticle } from './interfaces';
import { Game } from '../domain/models';

export class MockMetadataProvider implements IMetadataProvider {
  async searchGames(query: string): Promise<Partial<Game>[]> {
    return [
      { id: 'mock-1', title: 'Hollow Knight', normalizedTitle: 'hollow knight', developer: 'Team Cherry' },
      { id: 'mock-2', title: 'Celeste', normalizedTitle: 'celeste', developer: 'Extremely OK Games' }
    ].filter(g => g.normalizedTitle.includes(query.toLowerCase()));
  }

  async getGameDetails(id: string): Promise<Partial<Game>> {
    if (id === 'mock-1') return { id: 'mock-1', title: 'Hollow Knight', genres: ['Metroidvania'] };
    return { id, title: 'Unknown Game' };
  }
}

export class MockArtworkProvider implements IArtworkProvider {
  async getCoverArt(gameTitle: string): Promise<string | null> {
    return `https://via.placeholder.com/300x400?text=${encodeURIComponent(gameTitle)}`;
  }
  async getBackground(gameTitle: string): Promise<string | null> {
    return `https://via.placeholder.com/1920x1080?text=${encodeURIComponent(gameTitle)}`;
  }
  async getIcon(gameTitle: string): Promise<string | null> {
    return `https://via.placeholder.com/64x64?text=${encodeURIComponent(gameTitle)}`;
  }
  async getLogo(gameTitle: string): Promise<string | null> {
    return `https://via.placeholder.com/400x200?text=${encodeURIComponent(gameTitle)}`;
  }
}

export class MockStoreProvider implements IStoreProvider {
  async getOffers(_gameTitle: string): Promise<StoreOffer[]> {
    return [
      { storeName: 'Steam', price: '$14.99', url: '#' },
      { storeName: 'GOG', price: '$9.99', url: '#' }
    ];
  }
}

export class MockNewsProvider implements INewsProvider {
  async getLatestNews(): Promise<NewsArticle[]> {
    return [
      {
        id: 'news-1',
        title: 'New Indie Hits 2026',
        summary: 'Explore the latest independent titles releasing this year.',
        url: '#',
        publishedAt: new Date().toISOString()
      },
      {
        id: 'news-2',
        title: 'PC Gaming Hardware Update',
        summary: 'The next generation of GPUs are here.',
        url: '#',
        publishedAt: new Date(Date.now() - 86400000).toISOString()
      }
    ];
  }
}

export class MockRecommendationProvider implements IRecommendationProvider {
  async getRecommendations(_library: Game[]): Promise<Partial<Game>[]> {
    return [
      { id: 'rec-1', title: 'Hades II', genres: ['Roguelike'] },
      { id: 'rec-2', title: 'Silksong', genres: ['Metroidvania'] }
    ];
  }
}

export const providers = {
  metadata: new MockMetadataProvider(),
  artwork: new MockArtworkProvider(),
  store: new MockStoreProvider(),
  news: new MockNewsProvider(),
  recommendations: new MockRecommendationProvider()
};
