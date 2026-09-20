import { useAppStore } from '../store';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ActivityEventType, ActivityEvent } from '../domain/models';
import { Play, Plus, Trophy, Award, Settings2, Ghost } from 'lucide-react';

export default function Activity() {
  const { activities, logActivity } = useAppStore();

  const handleSimulateActivity = () => {
    const types: ActivityEventType[] = ['GAME_ADDED', 'GAME_LAUNCHED', 'SESSION_COMPLETED', 'ACHIEVEMENT_UNLOCKED'];
    const type = types[Math.floor(Math.random() * types.length)];

    const event: ActivityEvent = {
      id: `evt-${Date.now()}`,
      type,
      timestamp: new Date().toISOString(),
      gameId: 'manual-example', // mock
      details: {
        gameTitle: 'Simulated Game',
        achievementName: type === 'ACHIEVEMENT_UNLOCKED' ? 'First Blood' : undefined
      }
    };
    logActivity(event);
  };

  const getEventIcon = (type: ActivityEventType) => {
    switch (type) {
      case 'GAME_ADDED': return <Plus className="w-5 h-5 text-blue-400" />;
      case 'GAME_LAUNCHED': return <Play className="w-5 h-5 text-green-400" />;
      case 'SESSION_COMPLETED': return <Ghost className="w-5 h-5 text-purple-400" />;
      case 'ACHIEVEMENT_UNLOCKED': return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 'BADGE_UNLOCKED': return <Award className="w-5 h-5 text-orange-400" />;
      case 'PROFILE_CHANGED': return <Settings2 className="w-5 h-5 text-gray-400" />;
      default: return <div className="w-5 h-5 bg-gray-500 rounded-full" />;
    }
  };

  const getEventDescription = (event: ActivityEvent) => {
    const title = event.details?.gameTitle || 'Unknown Game';
    switch (event.type) {
      case 'GAME_ADDED': return <span>Added <span className="font-semibold">{title}</span> to library</span>;
      case 'GAME_LAUNCHED': return <span>Launched <span className="font-semibold">{title}</span></span>;
      case 'SESSION_COMPLETED': return <span>Finished playing <span className="font-semibold">{title}</span></span>;
      case 'ACHIEVEMENT_UNLOCKED': return <span>Unlocked achievement <span className="font-semibold">"{event.details?.achievementName}"</span> in {title}</span>;
      case 'BADGE_UNLOCKED': return <span>Earned a new badge!</span>;
      case 'PROFILE_CHANGED': return <span>Updated profile settings</span>;
      default: return <span>Unknown activity</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto h-full flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Activity Timeline</h2>
        <Button size="sm" variant="secondary" onClick={handleSimulateActivity}>Simulate Event</Button>
      </div>

      {activities.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface)] py-16">
          <Ghost className="w-12 h-12 text-[var(--text-muted)] mb-4" />
          <h3 className="text-lg font-semibold mb-2">No activity yet</h3>
          <p className="text-[var(--text-muted)]">Your gaming history will appear here.</p>
        </div>
      ) : (
        <div className="relative border-l-2 border-[var(--border-subtle)] ml-6 space-y-8 pb-8 overflow-y-auto flex-1 px-4">
          {activities.map((event) => (
            <div key={event.id} className="relative pl-8">
              <div className="absolute -left-[21px] top-1 p-1.5 bg-[var(--bg-surface-elevated)] border-2 border-[var(--border-subtle)] rounded-full z-10 shadow-sm">
                {getEventIcon(event.type)}
              </div>
              <Card className="hover:border-[var(--border-strong)] transition-colors">
                <div className="p-4 sm:p-5">
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-[var(--text-main)] text-sm sm:text-base leading-relaxed">
                      {getEventDescription(event)}
                    </p>
                    <time className="text-xs text-[var(--text-placeholder)] whitespace-nowrap pt-1 flex-shrink-0">
                      {new Date(event.timestamp).toLocaleString(undefined, {
                        month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
                      })}
                    </time>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
