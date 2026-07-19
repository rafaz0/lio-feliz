export function SettingsEmpty() {
  return (
    <div
      data-testid="settings-empty"
      className="rounded-xl border border-dashed p-10 text-center"
      role="status"
    >
      <p className="text-sm font-medium">Sem configurações</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Não foi possível carregar as configurações do usuário.
      </p>
    </div>
  );
}
