import { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { providers } from '../providers/mocks';
import { NewsArticle } from '../providers/interfaces';
import { Play } from 'lucide-react';

export default function Home() {
  const [news, setNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    providers.news.getLatestNews().then(setNews);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Jump Back In</h2>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Mock Recent Games */}
          {[1, 2, 3].map((i) => (
            <Card key={i} className="group relative overflow-hidden transition-all hover:shadow-md hover:border-[var(--accent-primary)]">
              <div className="aspect-[3/4] bg-[var(--bg-surface-elevated)] relative">
                <img
                  src={`https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop&text=Game${i}`}
                  alt="Game cover"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-semibold text-lg text-white mb-1 shadow-black drop-shadow-md">Recent Game {i}</h3>
                  <p className="text-xs text-[var(--text-muted)]">2 hours ago</p>
                </div>

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <Button className="rounded-full w-14 h-14 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] shadow-lg hover:scale-105 transition-transform">
                    <Play className="fill-current w-6 h-6 ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1 lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-bold tracking-tight mb-4">Activity Summary</h2>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center text-center">
                  <div>
                    <p className="text-[var(--text-muted)] text-sm mb-1">Games Played</p>
                    <p className="text-3xl font-bold">12</p>
                  </div>
                  <div className="w-px h-12 bg-[var(--border-subtle)]"></div>
                  <div>
                    <p className="text-[var(--text-muted)] text-sm mb-1">Total Playtime</p>
                    <p className="text-3xl font-bold">48h</p>
                  </div>
                  <div className="w-px h-12 bg-[var(--border-subtle)]"></div>
                  <div>
                    <p className="text-[var(--text-muted)] text-sm mb-1">Achievements</p>
                    <p className="text-3xl font-bold text-[var(--status-warning)]">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight mb-4">Recommendations</h2>
            <div className="space-y-3">
              {[1, 2].map(i => (
                <Card key={i} className="hover:bg-[var(--bg-surface-hover)] transition-colors cursor-pointer">
                  <div className="flex p-4 space-x-4 items-center">
                    <div className="w-16 h-16 bg-[var(--bg-surface-elevated)] rounded-md flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-semibold">Recommended Game {i}</h4>
                      <p className="text-sm text-[var(--text-muted)] mt-1">Because you played Hollow Knight</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight">Gaming News</h2>
          <div className="space-y-4">
            {news.map(article => (
              <Card key={article.id} className="overflow-hidden flex flex-col cursor-pointer hover:border-[var(--accent-primary)] transition-colors">
                <div className="h-32 bg-[var(--bg-surface-elevated)] bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=400&auto=format&fit=crop)` }} />
                <CardContent className="p-4 pt-4 flex-1 flex flex-col">
                  <h4 className="font-semibold text-sm line-clamp-2">{article.title}</h4>
                  <p className="text-xs text-[var(--text-muted)] mt-2 flex-1">{article.summary}</p>
                  <span className="text-[10px] text-[var(--text-placeholder)] mt-3">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                </CardContent>
              </Card>
            ))}
            {news.length === 0 && (
              <p className="text-[var(--text-muted)] text-sm">No news currently available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
