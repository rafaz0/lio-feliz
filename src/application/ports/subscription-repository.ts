export interface Assinatura {
  usuarioId: string;
  plano: string;
  dataAtivacao: Date;
  dataExpiracao: Date | null;
  recursosLiberados: string[];
}

export interface PlanoDto {
  planoId: string;
  nome: string;
  descricao: string;
  precoMensal: number;
  recursos: string[];
}

export interface ISubscriptionRepository {
  ObterPlanoAtivo(usuarioId: string): Promise<Assinatura | null>;
  Salvar(assinatura: Assinatura): Promise<void>;
  ListarPlanosDisponiveis(): Promise<PlanoDto[]>;

  savePlan(plan: import("@/core/domain/subscriptions").Plan): Promise<void>;
  findPlanById(planId: string): Promise<import("@/core/domain/subscriptions").Plan | null>;
  findAllPlans(): Promise<import("@/core/domain/subscriptions").Plan[]>;
  saveSubscription(subscription: import("@/core/domain/subscriptions").Subscription): Promise<void>;
  findSubscriptionsByUser(userId: string): Promise<import("@/core/domain/subscriptions").Subscription[]>;
}
