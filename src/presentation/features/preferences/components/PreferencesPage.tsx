export function PreferencesPage({ userId }: { userId: string }) {
  return (
    <div data-testid="preferences-page" className="space-y-6">
      <h1 className="text-xl font-semibold">Preferencias</h1>
      <p className="text-sm text-muted-foreground">Personalize sua experiencia na plataforma.</p>
      <div className="space-y-4">
        <div className="rounded-lg border p-4">
          <h2 className="text-sm font-medium">Tema</h2>
          <p className="text-xs text-muted-foreground">Escolha entre claro, escuro ou sistema.</p>
        </div>
        <div className="rounded-lg border p-4">
          <h2 className="text-sm font-medium">Layout do Dashboard</h2>
          <p className="text-xs text-muted-foreground">Personalize a disposicao dos widgets.</p>
        </div>
        <div className="rounded-lg border p-4">
          <h2 className="text-sm font-medium">Notificacoes</h2>
          <p className="text-xs text-muted-foreground">Ative ou desative notificacoes.</p>
        </div>
      </div>
    </div>
  );
}
