import { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { ProfileHeader } from '../components/ProfileHeader';
import { useAppStore } from '../store';
import { providers } from '../providers/mocks';
import { NewsArticle } from '../providers/interfaces';
import { Play } from 'lucide-react';

export default function Home() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const { profile, games, activities } = useAppStore();

  useEffect(() => {
    providers.news.getLatestNews().then(setNews);
  }, []);

  const recentGames = games
    .filter(g => g.lastPlayedAt)
    .sort((a, b) => new Date(b.lastPlayedAt!).getTime() - new Date(a.lastPlayedAt!).getTime())
    .slice(0, 4);

  const completedSessions = activities.filter(a => a.type === 'SESSION_COMPLETED');
  const totalPlaytime = completedSessions.reduce((acc, curr) => acc + (curr.details?.durationMinutes || 0), 0) / 60;
  const achievementsCount = activities.filter(a => a.type === 'ACHIEVEMENT_UNLOCKED').length;


  return (
    <div className="animate-in fade-in duration-300">
      <ProfileHeader profile={profile} />

      <div className="p-8 space-y-12">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold tracking-tight text-white">Continue Jogando</h2>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">Ver Todos</Button>
          </div>

          {recentGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {recentGames.map((game) => (
                <Card key={game.id} className="group relative overflow-hidden transition-all hover:shadow-xl hover:border-white/50 border-white/10 bg-[var(--bg-surface)]">
                  <div className="aspect-[16/9] bg-black relative">
                    {game.backgroundUrl || game.coverUrl ? (
                      <img
                        src={game.backgroundUrl || game.coverUrl}
                        alt={`${game.title} cover`}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                         <span className="text-gray-400 font-bold">{game.title}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-bold text-xl text-white mb-1 shadow-black drop-shadow-lg truncate">{game.title}</h3>
                      <p className="text-sm text-gray-300">Última vez: {new Date(game.lastPlayedAt!).toLocaleDateString()}</p>
                    </div>

                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                      <Button className="rounded-full w-16 h-16 bg-white text-black hover:bg-gray-200 shadow-xl hover:scale-105 transition-transform">
                        <Play className="fill-current w-6 h-6 ml-1" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
             <div className="text-center py-12 border border-white/10 rounded-lg bg-[var(--bg-surface)]">
               <p className="text-gray-400">Nenhum jogo recente. Adicione e jogue um jogo para vê-lo aqui.</p>
             </div>
          )}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="col-span-1 lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-6">Resumo de Atividade</h2>
              <Card className="border-white/10 bg-[var(--bg-surface)]">
                <CardContent className="p-8">
                  <div className="flex justify-between items-center text-center">
                    <div>
                      <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider font-semibold">Jogos</p>
                      <p className="text-4xl font-bold text-white">{games.length}</p>
                    </div>
                    <div className="w-px h-16 bg-white/20"></div>
                    <div>
                      <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider font-semibold">Tempo Total</p>
                      <p className="text-4xl font-bold text-white">{Math.round(totalPlaytime)}h</p>
                    </div>
                    <div className="w-px h-16 bg-white/20"></div>
                    <div>
                      <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider font-semibold">Conquistas</p>
                      <p className="text-4xl font-bold text-white">{achievementsCount}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-6">Recomendações</h2>
              <div className="space-y-4">
                 <div className="text-center py-8 border border-white/10 rounded-lg bg-[var(--bg-surface)]">
                   <p className="text-gray-400 text-sm">Sem recomendações no momento.<br/>Basearemos novas recomendações na sua biblioteca.</p>
                 </div>
              </div>
            </section>
          </div>

          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-6">Amigos Jogando</h2>
              <div className="space-y-4">
                 <div className="text-center py-8 border border-white/10 rounded-lg bg-[var(--bg-surface)]">
                   <p className="text-gray-400 text-sm">Nenhum amigo online no momento.<br/>Conecte suas plataformas para ver a atividade.</p>
                 </div>
              </div>
            </section>

            <section>
            <h2 className="text-2xl font-bold tracking-tight text-white mb-6">Notícias</h2>
            <div className="space-y-5">
              {news.map(article => (
                <Card key={article.id} className="overflow-hidden flex flex-col cursor-pointer hover:border-white/40 transition-colors border-white/10 bg-[var(--bg-surface)]">
                  <div className="h-40 bg-black bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=400&auto=format&fit=crop)` }} />
                  <CardContent className="p-5 pt-5 flex-1 flex flex-col">
                    <h4 className="font-bold text-base text-white line-clamp-2">{article.title}</h4>
                    <p className="text-sm text-gray-400 mt-3 flex-1 line-clamp-3">{article.summary}</p>
                    <span className="text-xs text-gray-500 mt-4 uppercase tracking-wider font-semibold">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </CardContent>
                </Card>
              ))}
              {news.length === 0 && (
                <p className="text-gray-400 text-sm">Nenhuma notícia disponível no momento.</p>
              )}
            </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
