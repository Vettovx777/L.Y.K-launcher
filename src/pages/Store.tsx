import { ShoppingBag } from 'lucide-react';

export default function Store() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
      <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6">
        <ShoppingBag className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-white mb-3">Loja</h2>
      <p className="text-gray-400 max-w-md">
        Nenhuma integração de loja ativa. Esta área exibirá descontos e ofertas de fontes legítimas quando os provedores forem configurados.
      </p>
    </div>
  );
}
