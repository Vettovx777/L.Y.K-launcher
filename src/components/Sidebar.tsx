import { NavLink } from 'react-router-dom';
import { Home, Library, Gamepad2, Settings as SettingsIcon, Activity, Sparkles, Newspaper, ShoppingBag } from 'lucide-react';
import { cn } from './Button';

export function Sidebar() {
  const navItems = [
    { to: '/', icon: Home, label: 'Início' },
    { to: '/games', icon: Library, label: 'Meus Jogos' },
    { to: '/emulators', icon: Gamepad2, label: 'Emuladores' },
    { to: '/activity', icon: Activity, label: 'Atividade' },
    { to: '/recommendations', icon: Sparkles, label: 'Recomendações' },
    { to: '/news', icon: Newspaper, label: 'Notícias' },
    { to: '/store', icon: ShoppingBag, label: 'Loja' },
  ];

  return (
    <aside className="w-64 border-r border-white/20 bg-black flex flex-col h-full flex-shrink-0">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-tight text-white">
          L.Y.K<span className="text-white">.</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(
              'flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium',
              isActive
                ? 'bg-white/10 text-white'
                : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)] hover:text-white'
            )}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/20">
        <NavLink
          to="/settings"
          className={({ isActive }) => cn(
            'flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium',
            isActive
              ? 'bg-white/10 text-white'
              : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)] hover:text-white'
          )}
        >
          <SettingsIcon size={18} />
          <span>Configurações</span>
        </NavLink>
      </div>
    </aside>
  );
}
