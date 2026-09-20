import { UserProfile } from '../domain/models';
import { Badge } from './Badge';
import { Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfileHeaderProps {
  profile: UserProfile | null;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  // Use a default banner if none exists
  const bannerUrl = profile?.bannerUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop';

  return (
    <div className="relative w-full h-48 sm:h-64 rounded-b-2xl overflow-hidden flex-shrink-0 bg-[var(--bg-surface-elevated)] border-b border-[var(--border-subtle)]">
      {/* Banner */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url(${bannerUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-app)] to-transparent opacity-90" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:px-8 flex items-end justify-between z-10">
        <div className="flex items-end space-x-6">
          {/* Avatar (rounded square) */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-4 border-[var(--bg-app)] shadow-lg bg-[var(--bg-surface-elevated)] flex-shrink-0 flex items-center justify-center">
            {profile?.avatarUrl ? (
              <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl text-[var(--text-muted)] font-bold">
                {profile?.displayName?.[0] || 'U'}
              </span>
            )}
          </div>

          <div className="mb-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
              {profile?.displayName || 'Unknown Player'}
            </h2>
            <div className="flex items-center space-x-3 mt-1.5">
              <span className="text-[var(--text-muted)] font-medium">
                @{profile?.username || 'user'}
              </span>
              <Badge variant="outline" className="bg-[var(--bg-app)]/50 backdrop-blur-sm border-[var(--border-subtle)]">
                Lvl {profile?.level || 1}
              </Badge>
            </div>
          </div>
        </div>

        <Link to="/settings" className="mb-2 text-[var(--text-muted)] hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
          <Settings size={20} />
        </Link>
      </div>
    </div>
  );
}
