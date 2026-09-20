import { NavLink } from 'react-router-dom';
import { Home, Library, Gamepad2, Settings as SettingsIcon, Activity } from 'lucide-react';
import { cn } from './Button';

export function Sidebar() {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/games', icon: Library, label: 'My Games' },
    { to: '/emulators', icon: Gamepad2, label: 'Emulators' },
    { to: '/activity', icon: Activity, label: 'Activity' },
  ];

  return (
    <aside className="w-64 border-r border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col h-full flex-shrink-0">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-tight text-[var(--text-main)]">
          L.Y.K<span className="text-[var(--accent-primary)]">.</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(
              'flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium',
              isActive
                ? 'bg-[var(--accent-primary)] text-white'
                : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-main)]'
            )}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-[var(--border-subtle)]">
        <NavLink
          to="/settings"
          className={({ isActive }) => cn(
            'flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium',
            isActive
              ? 'bg-[var(--accent-primary)] text-white'
              : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-main)]'
          )}
        >
          <SettingsIcon size={18} />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}
