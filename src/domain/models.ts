export type LaunchActionType = 'executable' | 'url' | 'emulator';

export interface LaunchAction {
  id: string;
  type: LaunchActionType;
  path?: string; // Path to executable or URL
  workingDirectory?: string;
  arguments?: string[]; // Arguments for executable
  emulatorId?: string; // If type is emulator
  emulatorArguments?: string[]; // Per-game overrides
}

export interface Game {
  id: string;
  title: string;
  normalizedTitle: string;
  developer?: string;
  publisher?: string;
  releaseDate?: string;
  genres: string[];
  tags: string[];
  platform: string;
  source: string; // e.g., 'steam', 'gog', 'manual'
  isInstalled: boolean;

  // Artwork
  coverUrl?: string;
  backgroundUrl?: string;
  iconUrl?: string;
  logoUrl?: string;

  // Playtime stats
  playtimeMinutes: number;
  lastPlayedAt?: string;

  // Launching
  launchActions: LaunchAction[];
  defaultLaunchActionId?: string;

  // Optional identifiers for metadata providers
  providerIds?: Record<string, string>;
}

export interface Emulator {
  id: string;
  name: string;
  executablePath: string;
  supportedPlatforms: string[];
  defaultArguments: string[];
}

export interface HardwareProfile {
  cpu?: string;
  gpu?: string;
  ramGB?: number;
  os?: string;
}

export interface UserProfile {
  id: string;
  displayName: string;
  username: string;
  avatarUrl?: string;
  bannerUrl?: string;
  level: number;
  hardware: HardwareProfile;
}

export interface Session {
  id: string;
  gameId: string;
  startTimestamp: string;
  endTimestamp?: string;
  durationMinutes?: number;
  launchSource: string;
}

export type ActivityEventType = 'GAME_ADDED' | 'GAME_LAUNCHED' | 'SESSION_COMPLETED' | 'ACHIEVEMENT_UNLOCKED' | 'BADGE_UNLOCKED' | 'PROFILE_CHANGED';

export interface ActivityEvent {
  id: string;
  type: ActivityEventType;
  timestamp: string;
  gameId?: string;
  details?: Record<string, any>;
}

export interface Achievement {
  id: string;
  gameId: string;
  title: string;
  description: string;
  iconUrl?: string;
  unlockedAt?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
  unlockedAt: string;
}
