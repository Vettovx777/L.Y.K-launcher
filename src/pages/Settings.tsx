import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAppStore } from '../store';
import { useState } from 'react';

export default function Settings() {
  const { profile, isLoaded } = useAppStore();
  const [displayName, setDisplayName] = useState(profile?.displayName || '');

  if (!isLoaded) return null;

  return (
    <div className="space-y-8 max-w-3xl mx-auto animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Settings</h2>
        <p className="text-[var(--text-muted)] text-sm">Manage your profile, preferences, and application settings.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-main)]">Display Name</label>
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your display name"
            />
          </div>
          <div className="pt-2">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integrations (Coming Soon)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-[var(--text-muted)]">
            Connect external providers to sync library metadata, artwork, and legitimate store information.
          </p>
          <div className="flex gap-4">
            <Button variant="secondary" disabled>Connect Steam</Button>
            <Button variant="secondary" disabled>Connect GOG</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Advanced</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-[var(--status-danger)]/10 border border-[var(--status-danger)]/20 rounded-md">
            <h4 className="text-[var(--status-danger)] font-medium mb-1">Danger Zone</h4>
            <p className="text-sm text-[var(--text-muted)] mb-3">Clear all local application data, including your registered games and activity.</p>
            <Button variant="danger" onClick={() => {
              if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
                localStorage.clear();
                window.location.reload();
              }
            }}>
              Clear All Local Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
