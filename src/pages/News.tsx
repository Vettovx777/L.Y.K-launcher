import { Newspaper } from 'lucide-react';

export default function News() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
      <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6">
        <Newspaper className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-white mb-3">Notícias</h2>
      <p className="text-gray-400 max-w-md">
        Nenhuma fonte de notícias conectada. A arquitetura está preparada para receber provedores de notícias externos futuramente.
      </p>
    </div>
  );
}
