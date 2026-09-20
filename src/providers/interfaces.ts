import { Game } from '../domain/models';

export interface IMetadataProvider {
  searchGames(query: string): Promise<Partial<Game>[]>;
  getGameDetails(id: string): Promise<Partial<Game>>;
}

export interface IArtworkProvider {
  getCoverArt(gameTitle: string, platform?: string): Promise<string | null>;
  getBackground(gameTitle: string): Promise<string | null>;
  getIcon(gameTitle: string): Promise<string | null>;
  getLogo(gameTitle: string): Promise<string | null>;
}

export interface StoreOffer {
  storeName: string;
  price: string;
  url: string;
}

export interface IStoreProvider {
  getOffers(gameTitle: string): Promise<StoreOffer[]>;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  url: string;
  imageUrl?: string;
  publishedAt: string;
}

export interface INewsProvider {
  getLatestNews(): Promise<NewsArticle[]>;
}

export interface IRecommendationProvider {
  getRecommendations(library: Game[]): Promise<Partial<Game>[]>;
}
