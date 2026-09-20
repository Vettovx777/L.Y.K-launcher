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
    <div className="space-y-6 animate-in fade-in duration-300 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold tracking-tight">My Games</h2>

        <div className="flex w-full sm:w-auto items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-placeholder)]" />
            <Input
              placeholder="Search library..."
              className="pl-9"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="secondary" size="sm" className="px-3 h-10">
            <Filter className="w-4 h-4" />
          </Button>
          <Button size="sm" className="h-10 px-4" onClick={handleManualAdd} disabled={isAdding}>
            <Plus className="w-4 h-4 mr-2" />
            Add Game
          </Button>
        </div>
      </div>

      {games.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface)]/50">
          <div className="w-16 h-16 rounded-full bg-[var(--bg-surface-elevated)] flex items-center justify-center mb-4">
            <Library className="w-8 h-8 text-[var(--text-muted)]" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Your library is empty</h3>
          <p className="text-[var(--text-muted)] max-w-sm text-center mb-6">
            Get started by manually registering a game or connecting a future provider integration.
          </p>
          <Button onClick={handleManualAdd}>Add your first game</Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 overflow-y-auto pb-6">
          {filteredGames.map(game => (
            <Card key={game.id} className="group relative overflow-hidden transition-all hover:shadow-md hover:border-[var(--accent-primary)] hover:-translate-y-1 cursor-pointer">
              <div className="aspect-[3/4] bg-[var(--bg-surface-elevated)] relative flex flex-col items-center justify-center p-4 text-center">
                {game.coverUrl ? (
                  <img src={game.coverUrl} alt={game.title} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="font-bold text-[var(--text-muted)] text-xl rotate-[-10deg] px-2">{game.title}</div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]" />

                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-4">
                  <Button
                    className="rounded-full w-12 h-12 mb-3 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] shadow-lg hover:scale-105 transition-transform"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLaunch(game);
                    }}
                    disabled={launchingId === game.id}
                  >
                    <Play className="fill-current w-5 h-5 ml-1" />
                  </Button>
                  <p className="text-xs text-white/80 font-medium">
                    {Math.floor(game.playtimeMinutes / 60)}h {(game.playtimeMinutes % 60)}m played
                  </p>
                </div>
              </div>
              <div className="p-3 bg-[var(--bg-surface)]">
                <h3 className="font-semibold text-sm truncate" title={game.title}>{game.title}</h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5 capitalize">{game.source}</p>
              </div>
            </Card>
          ))}
          {filteredGames.length === 0 && (
            <div className="col-span-full py-12 text-center text-[var(--text-muted)]">
              No games found matching "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
