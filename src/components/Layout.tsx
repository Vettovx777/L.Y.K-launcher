import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAppStore } from '../store';

export function Layout() {
  const { isLoaded, loadInitialData } = useAppStore();

  useEffect(() => {
    if (!isLoaded) {
      loadInitialData();
    }
  }, [isLoaded, loadInitialData]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--bg-app)] text-[var(--text-main)]">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[var(--bg-app)] text-[var(--text-main)] overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-black">
        <Header />
        <div className="flex-1 overflow-y-auto relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
