import type { ISubscriptionRepository, Assinatura, PlanoDto } from "@/application/ports";

export class FakeSubscriptionRepository implements ISubscriptionRepository {
  private assinaturas = new Map<string, Assinatura>();
  private planos: PlanoDto[] = [];

  async ObterPlanoAtivo(usuarioId: string): Promise<Assinatura | null> {
    return this.assinaturas.get(usuarioId) ?? null;
  }

  async Salvar(assinatura: Assinatura): Promise<void> {
    this.assinaturas.set(assinatura.usuarioId, assinatura);
  }

  async ListarPlanosDisponiveis(): Promise<PlanoDto[]> {
    return this.planos;
  }

  setPlanos(planos: PlanoDto[]): void {
    this.planos = planos;
  }

  reset(): void {
    this.assinaturas.clear();
    this.planos = [];
  }
}
