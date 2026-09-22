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
    <div className="relative w-full h-48 sm:h-[300px] overflow-hidden flex-shrink-0 bg-black border-b border-white/10 group">
      {/* Banner */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50 transition-transform duration-1000 ease-[var(--ease-spring)] group-hover:scale-105"
        style={{ backgroundImage: `url(${bannerUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 sm:px-12 flex items-end justify-between z-10">
        <div className="flex items-end space-x-8 transform transition-transform duration-500 ease-[var(--ease-spring)] translate-y-2 group-hover:translate-y-0">
          {/* Avatar (rounded square) */}
          <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl bg-[var(--bg-surface-elevated)] flex-shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-105 hover:border-white/50 cursor-pointer">
            {profile?.avatarUrl ? (
              <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl text-[var(--text-muted)] font-bold">
                {profile?.displayName?.[0] || 'U'}
              </span>
            )}
          </div>

          <div className="mb-3">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg mb-2">
              {profile?.displayName || 'Unknown Player'}
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 font-medium tracking-wide text-lg">
                @{profile?.username || 'user'}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <Badge variant="outline" className="bg-black/50 backdrop-blur-md border-white/20 text-white font-bold px-3 py-1 text-sm shadow-sm transition-colors hover:bg-white/10 cursor-default">
                Nível {profile?.level || 1}
              </Badge>
            </div>
          </div>
        </div>

        <Link to="/settings" className="mb-4 text-gray-400 hover:text-white transition-all duration-200 p-3 rounded-full hover:bg-white/10 hover:scale-110 active:scale-95 bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
          <Settings size={22} className="transition-transform duration-500 group-hover:rotate-45" />
        </Link>
      </div>
    </div>
  );
}
