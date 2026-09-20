import { create } from 'zustand';
import { Game, UserProfile, ActivityEvent } from '../domain/models';
import { persistence } from '../persistence';

interface AppState {
  games: Game[];
  profile: UserProfile | null;
  activities: ActivityEvent[];
  isLoaded: boolean;

  loadInitialData: () => Promise<void>;
  addGame: (game: Game) => Promise<void>;
  updateGame: (game: Game) => Promise<void>;
  logActivity: (event: ActivityEvent) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  games: [],
  profile: null,
  activities: [],
  isLoaded: false,

  loadInitialData: async () => {
    const [games, profile, activities] = await Promise.all([
      persistence.getGames(),
      persistence.getUserProfile(),
      persistence.getActivityEvents()
    ]);

    set({ games, profile, activities, isLoaded: true });
  },

  addGame: async (game: Game) => {
    await persistence.saveGame(game);
    set({ games: [...get().games, game] });
  },

  updateGame: async (game: Game) => {
    await persistence.saveGame(game);
    set({ games: get().games.map(g => g.id === game.id ? game : g) });
  },

  logActivity: async (event: ActivityEvent) => {
    await persistence.saveActivityEvent(event);
    set({ activities: [event, ...get().activities] });
  }
}));
