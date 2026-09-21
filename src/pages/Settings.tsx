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
    <div className="space-y-8 max-w-3xl mx-auto animate-in fade-in duration-300 p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Configurações</h2>
        <p className="text-gray-400 text-sm">Gerencie seu perfil, preferências e configurações do aplicativo.</p>
      </div>

      <Card className="border-white/10 bg-[var(--bg-surface)]">
        <CardHeader>
          <CardTitle className="text-white">Informações do Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-white uppercase tracking-wider">Nome de Exibição</label>
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Seu nome"
              className="bg-white/5 border-white/10 text-white focus:border-white"
            />
          </div>
          <div className="pt-2">
            <Button className="bg-white text-black hover:bg-gray-200">Salvar Alterações</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-[var(--bg-surface)]">
        <CardHeader>
          <CardTitle className="text-white">Integrações (Em Breve)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-400">
            Conecte provedores externos para sincronizar metadados da biblioteca, artes e informações legítimas da loja.
          </p>
          <div className="flex gap-4">
            <Button variant="secondary" className="bg-white/5 border-white/10 text-gray-400 cursor-not-allowed" disabled>Conectar Steam</Button>
            <Button variant="secondary" className="bg-white/5 border-white/10 text-gray-400 cursor-not-allowed" disabled>Conectar GOG</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-[var(--bg-surface)]">
        <CardHeader>
          <CardTitle className="text-white">Avançado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-5 border border-red-500/30 bg-red-500/5 rounded-md">
            <h4 className="text-red-400 font-bold mb-2 uppercase tracking-wider">Zona de Perigo</h4>
            <p className="text-sm text-gray-400 mb-4">Apague todos os dados locais do aplicativo, incluindo seus jogos registrados e atividades.</p>
            <Button variant="danger" className="bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/50" onClick={() => {
              if (confirm('Tem certeza de que deseja apagar todos os dados? Isso não pode ser desfeito.')) {
                localStorage.clear();
                window.location.reload();
              }
            }}>
              Apagar Todos os Dados
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
