import { Search, Minus, Square, X } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';

export function Header() {
  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-white/20 bg-black flex-shrink-0">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-placeholder)]" />
          <Input
            placeholder="Search..."
            className="pl-9 h-9 bg-[var(--bg-surface-elevated)] border-transparent focus:border-white focus:ring-0 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 ml-4">
        {/* Placeholder for standard window controls */}
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-md text-white hover:bg-white/10">
          <Minus size={16} />
        </Button>
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-md text-white hover:bg-white/10">
          <Square size={14} />
        </Button>
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-md text-white hover:bg-red-500 hover:text-white">
          <X size={16} />
        </Button>
      </div>
    </header>
  );
}
