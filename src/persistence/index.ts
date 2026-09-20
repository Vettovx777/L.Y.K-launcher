import { Game, Emulator, UserProfile, Session, ActivityEvent } from '../domain/models';

export interface IPersistenceLayer {
  // Games
  getGames(): Promise<Game[]>;
  getGame(id: string): Promise<Game | null>;
  saveGame(game: Game): Promise<void>;
  deleteGame(id: string): Promise<void>;

  // Emulators
  getEmulators(): Promise<Emulator[]>;
  saveEmulator(emulator: Emulator): Promise<void>;

  // User Profile
  getUserProfile(): Promise<UserProfile | null>;
  saveUserProfile(profile: UserProfile): Promise<void>;

  // Sessions
  getSessions(): Promise<Session[]>;
  saveSession(session: Session): Promise<void>;

  // Activity
  getActivityEvents(): Promise<ActivityEvent[]>;
  saveActivityEvent(event: ActivityEvent): Promise<void>;
}

export class LocalPersistence implements IPersistenceLayer {
  private get<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (!data) return null;
    try {
      return JSON.parse(data) as T;
    } catch {
      return null;
    }
  }

  private set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Games
  async getGames(): Promise<Game[]> {
    return this.get<Game[]>('games') || [];
  }

  async getGame(id: string): Promise<Game | null> {
    const games = await this.getGames();
    return games.find(g => g.id === id) || null;
  }

  async saveGame(game: Game): Promise<void> {
    const games = await this.getGames();
    const index = games.findIndex(g => g.id === game.id);
    if (index >= 0) {
      games[index] = game;
    } else {
      games.push(game);
    }
    this.set('games', games);
  }

  async deleteGame(id: string): Promise<void> {
    const games = await this.getGames();
    this.set('games', games.filter(g => g.id !== id));
  }

  // Emulators
  async getEmulators(): Promise<Emulator[]> {
    return this.get<Emulator[]>('emulators') || [];
  }

  async saveEmulator(emulator: Emulator): Promise<void> {
    const emulators = await this.getEmulators();
    const index = emulators.findIndex(e => e.id === emulator.id);
    if (index >= 0) {
      emulators[index] = emulator;
    } else {
      emulators.push(emulator);
    }
    this.set('emulators', emulators);
  }

  // User Profile
  async getUserProfile(): Promise<UserProfile | null> {
    return this.get<UserProfile>('user_profile');
  }

  async saveUserProfile(profile: UserProfile): Promise<void> {
    this.set('user_profile', profile);
  }

  // Sessions
  async getSessions(): Promise<Session[]> {
    return this.get<Session[]>('sessions') || [];
  }

  async saveSession(session: Session): Promise<void> {
    const sessions = await this.getSessions();
    const index = sessions.findIndex(s => s.id === session.id);
    if (index >= 0) {
      sessions[index] = session;
    } else {
      sessions.push(session);
    }
    this.set('sessions', sessions);
  }

  // Activity
  async getActivityEvents(): Promise<ActivityEvent[]> {
    return this.get<ActivityEvent[]>('activity_events') || [];
  }

  async saveActivityEvent(event: ActivityEvent): Promise<void> {
    const events = await this.getActivityEvents();
    const index = events.findIndex(e => e.id === event.id);
    if (index >= 0) {
      events[index] = event;
    } else {
      events.push(event);
    }
    this.set('activity_events', events);
  }
}

export const persistence: IPersistenceLayer = new LocalPersistence();
