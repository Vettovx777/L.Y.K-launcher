import { useState, useMemo } from 'react';
import { useAppStore } from '../store';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Search, Plus, Filter, Play, Library } from 'lucide-react';
import { invoke } from '@tauri-apps/api/core';
import { Game } from '../domain/models';

export default function MyGames() {
  const { games, addGame } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [launchingId, setLaunchingId] = useState<string | null>(null);

  const filteredGames = useMemo(() => {
    if (!searchQuery) return games;
    const lowerQ = searchQuery.toLowerCase();
    return games.filter(g => g.normalizedTitle.includes(lowerQ));
  }, [games, searchQuery]);

  const handleManualAdd = () => {
    const newGame: Game = {
      id: `manual-${Date.now()}`,
      title: 'New Manual Game',
      normalizedTitle: 'new manual game',
      genres: [],
      tags: [],
      platform: 'PC',
      source: 'manual',
      isInstalled: true,
      playtimeMinutes: 0,
      launchActions: [
        {
          id: 'default',
          type: 'executable',
          path: 'C:\\Windows\\System32\\calc.exe', // Dummy executable for testing
          arguments: []
        }
      ],
      defaultLaunchActionId: 'default'
    };
    addGame(newGame);
    setIsAdding(false);
  };

  const handleLaunch = async (game: Game) => {
    if (launchingId) return;
    const actionId = game.defaultLaunchActionId;
    if (!actionId) return alert('No launch action configured.');

    const action = game.launchActions.find(a => a.id === actionId);
    if (!action || action.type !== 'executable' || !action.path) {
      return alert('Invalid launch action.');
    }

    setLaunchingId(game.id);
    try {
      // Calling the secure Rust command we defined
      await invoke('launch_game', { gameId: game.id });
    } catch (e) {
      console.error(e);
      alert(`Failed to launch game: ${e}`);
    } finally {
      setLaunchingId(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 h-full flex flex-col p-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h2 className="text-3xl font-bold tracking-tight text-white">Meus Jogos</h2>

        <div className="flex w-full sm:w-auto items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Buscar na biblioteca..."
              className="pl-9 h-10 bg-white/5 border-white/10 text-white focus:border-white"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="secondary" size="sm" className="px-3 h-10 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white">
            <Filter className="w-4 h-4" />
          </Button>
          <Button size="sm" className="h-10 px-4 bg-white text-black hover:bg-gray-200" onClick={handleManualAdd} disabled={isAdding}>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Jogo
          </Button>
        </div>
      </div>

      {games.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-xl bg-white/5">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-6">
            <Library className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white">Sua biblioteca está vazia</h3>
          <p className="text-gray-400 max-w-md text-center mb-8">
            Comece registrando um jogo manualmente ou aguarde futuras integrações de provedores.
          </p>
          <Button className="bg-white text-black hover:bg-gray-200" onClick={handleManualAdd}>Adicionar seu primeiro jogo</Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8 overflow-y-auto pb-8">
          {filteredGames.map(game => (
            <Card key={game.id} className="launcher-card group relative overflow-hidden border-white/10 bg-[var(--bg-surface)] cursor-pointer">
              <div className="aspect-[3/4] bg-black relative flex flex-col items-center justify-center text-center overflow-hidden">
                {game.coverUrl ? (
                  <img src={game.coverUrl} alt={game.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-[var(--ease-spring)] group-hover:scale-110" />
                ) : (
                  <div className="font-bold text-gray-500 text-xl rotate-[-10deg] px-2 uppercase tracking-widest transition-transform duration-500 ease-[var(--ease-spring)] group-hover:scale-110">{game.title}</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />

                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 p-4">
                  <Button
                    className="rounded-full w-14 h-14 mb-4 bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-110 transition-transform duration-300 ease-[var(--ease-spring)]"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLaunch(game);
                    }}
                    disabled={launchingId === game.id}
                  >
                    <Play className="fill-current w-6 h-6 ml-1" />
                  </Button>
                  <p className="text-sm text-gray-200 font-bold uppercase tracking-wider drop-shadow-md">
                    {Math.floor(game.playtimeMinutes / 60)}h {(game.playtimeMinutes % 60)}m jogados
                  </p>
                </div>
              </div>
              <div className="p-4 bg-[var(--bg-surface)] border-t border-white/10 z-10 relative">
                <h3 className="font-bold text-base truncate text-white transition-colors group-hover:text-gray-200" title={game.title}>{game.title}</h3>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold transition-colors group-hover:text-gray-400">{game.source}</p>
              </div>
            </Card>
          ))}
          {filteredGames.length === 0 && (
            <div className="col-span-full py-16 text-center text-gray-500 font-medium">
              Nenhum jogo encontrado com "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
