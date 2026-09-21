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
      case 'GAME_ADDED': return <Plus className="w-5 h-5 text-white" />;
      case 'GAME_LAUNCHED': return <Play className="w-5 h-5 text-white" />;
      case 'SESSION_COMPLETED': return <Ghost className="w-5 h-5 text-white" />;
      case 'ACHIEVEMENT_UNLOCKED': return <Trophy className="w-5 h-5 text-white" />;
      case 'BADGE_UNLOCKED': return <Award className="w-5 h-5 text-white" />;
      case 'PROFILE_CHANGED': return <Settings2 className="w-5 h-5 text-white" />;
      default: return <div className="w-5 h-5 bg-white rounded-full" />;
    }
  };

  const getEventDescription = (event: ActivityEvent) => {
    const title = event.details?.gameTitle || 'Jogo Desconhecido';
    switch (event.type) {
      case 'GAME_ADDED': return <span>Adicionou <span className="font-bold text-white">{title}</span> à biblioteca</span>;
      case 'GAME_LAUNCHED': return <span>Iniciou <span className="font-bold text-white">{title}</span></span>;
      case 'SESSION_COMPLETED': return <span>Terminou de jogar <span className="font-bold text-white">{title}</span></span>;
      case 'ACHIEVEMENT_UNLOCKED': return <span>Desbloqueou conquista <span className="font-bold text-white">"{event.details?.achievementName}"</span> em {title}</span>;
      case 'BADGE_UNLOCKED': return <span>Ganhou uma nova insígnia!</span>;
      case 'PROFILE_CHANGED': return <span>Atualizou o perfil</span>;
      default: return <span>Atividade desconhecida</span>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto h-full flex flex-col p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-white">Linha do Tempo</h2>
        <Button size="sm" variant="secondary" className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white" onClick={handleSimulateActivity}>Simular Evento</Button>
      </div>

      {activities.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center border border-white/20 rounded-xl bg-[var(--bg-surface)] py-16">
          <Ghost className="w-16 h-16 text-gray-400 mb-6" />
          <h3 className="text-2xl font-bold mb-3 text-white">Nenhuma atividade</h3>
          <p className="text-gray-400">Seu histórico de jogos aparecerá aqui.</p>
        </div>
      ) : (
        <div className="relative border-l-2 border-white/20 ml-6 space-y-8 pb-8 overflow-y-auto flex-1 px-4">
          {activities.map((event) => (
            <div key={event.id} className="relative pl-8">
              <div className="absolute -left-[21px] top-1 p-2 bg-black border-2 border-white/30 rounded-full z-10 shadow-lg">
                {getEventIcon(event.type)}
              </div>
              <Card className="hover:border-white/50 border-white/10 bg-[var(--bg-surface)] transition-colors">
                <div className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      {getEventDescription(event)}
                    </p>
                    <time className="text-xs text-gray-500 whitespace-nowrap pt-1 flex-shrink-0 uppercase tracking-wider font-semibold">
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
