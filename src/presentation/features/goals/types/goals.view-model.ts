import type { MetaListDto, MetaProgressoDetalhadoDto } from "@/application/dtos/metas";

export interface GoalViewModel {
  readonly id: string;
  readonly name: string;
  readonly targetAmount: string;
  readonly currentAmount: string;
  readonly remainingAmount: string;
  readonly percentage: number;
  readonly targetDate: string;
  readonly category: string;
  readonly status: string;
}

export interface GoalDetailViewModel {
  readonly id: string;
  readonly name: string;
  readonly percentage: number;
  readonly projectedDate: string;
  readonly onTrack: boolean | null;
  readonly contributions: number;
  readonly monthlyAverage: string;
  readonly currentAmount: string;
  readonly targetAmount: string;
  readonly remainingAmount: string;
}

export interface GoalsSummaryViewModel {
  readonly total: number;
  readonly active: number;
  readonly completed: number;
  readonly totalTarget: string;
  readonly totalCurrent: string;
  readonly overallPercentage: number;
}

export interface GoalFiltersViewModel {
  readonly termo: string;
  readonly status: string;
  readonly category: string;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(new Date(date));
}

export function toGoalViewModel(dto: MetaListDto): GoalViewModel {
  return {
    id: dto.id,
    name: dto.name,
    targetAmount: formatCurrency(dto.targetAmount),
    currentAmount: formatCurrency(dto.currentAmount),
    remainingAmount: formatCurrency(dto.targetAmount - dto.currentAmount),
    percentage: dto.percentage,
    targetDate: formatDate(dto.targetDate),
    category: dto.category,
    status: dto.status,
  };
}

export function toGoalViewModels(dtos: MetaListDto[]): GoalViewModel[] {
  return dtos.map(toGoalViewModel);
}

export function toGoalDetailViewModel(dto: MetaProgressoDetalhadoDto): GoalDetailViewModel {
  return {
    id: dto.id,
    name: dto.name,
    percentage: dto.percentage,
    projectedDate: dto.projectedDate ? formatDate(dto.projectedDate) : "—",
    onTrack: dto.onTrack,
    contributions: dto.contributions,
    monthlyAverage: dto.monthlyAverage ? formatCurrency(dto.monthlyAverage) : "—",
    currentAmount: formatCurrency(dto.currentAmount),
    targetAmount: formatCurrency(dto.targetAmount),
    remainingAmount: formatCurrency(dto.remainingAmount),
  };
}

export function toGoalsSummaryViewModel(goals: GoalViewModel[]): GoalsSummaryViewModel {
  const total = goals.length;
  const active = goals.filter((g) => g.status === "ACTIVE").length;
  const completed = goals.filter((g) => g.status === "COMPLETED").length;

  const parseAmount = (v: string) =>
    Number.parseFloat(v.replace(/[^0-9,-]/g, "").replace(",", ".")) || 0;

  const totalCurrent = goals.reduce((acc, g) => acc + parseAmount(g.currentAmount), 0);
  const totalTarget = goals.reduce((acc, g) => acc + parseAmount(g.targetAmount), 0);

  return {
    total,
    active,
    completed,
    totalTarget: formatCurrency(totalTarget),
    totalCurrent: formatCurrency(totalCurrent),
    overallPercentage: totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0,
  };
}

export function filterGoals(
  goals: GoalViewModel[],
  filters: GoalFiltersViewModel,
): GoalViewModel[] {
  return goals.filter((g) => {
    if (filters.termo) {
      const term = filters.termo.toLowerCase();
      if (!g.name.toLowerCase().includes(term) && !g.category.toLowerCase().includes(term)) {
        return false;
      }
    }
    if (filters.status && filters.status !== "TODOS") {
      if (g.status !== filters.status) return false;
    }
    if (filters.category && filters.category !== "TODAS") {
      if (g.category !== filters.category) return false;
    }
    return true;
  });
}

export function statusToLabel(status: string): string {
  const map: Record<string, string> = {
    ACTIVE: "Ativa",
    PAUSED: "Pausada",
    COMPLETED: "Concluída",
    CANCELLED: "Cancelada",
  };
  return map[status] ?? status;
}

export function categoryToLabel(category: string): string {
  const map: Record<string, string> = {
    EMERGENCY: "Emergência",
    RETIREMENT: "Aposentadoria",
    EDUCATION: "Educação",
    TRAVEL: "Viagem",
    LARGE_PURCHASE: "Grande Compra",
    INVESTMENT: "Investimento",
    OTHER: "Outro",
  };
  return map[category] ?? category;
}
