export type FiiSegment =
  | "Tijolo"
  | "Papel"
  | "Híbrido"
  | "Fundos de Fundos"
  | "Logístico"
  | "Shopping"
  | "Hospitalar"
  | "Educacional";

export interface FiiDividend {
  paidAt: string;
  amount: number;
}

export interface Fii {
  ticker: string;
  name: string;
  segment: FiiSegment;
  price: number;
  dy: number;
  pvp: number;
  capRate: number;
  vacancy: number;
  avgVacancy: number;
  dailyLiquidity: number;
  shareholders: number;
  dividendHistory: FiiDividend[];
  history: { date: string; close: number }[];
  description: string;
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function buildFiiHistory(basePrice: number, seed: number): { date: string; close: number }[] {
  const rand = seededRandom(seed);
  const out: { date: string; close: number }[] = [];
  const now = new Date();
  let p = basePrice * (0.85 + rand() * 0.15);
  for (let i = 51; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i * 7);
    const drift = (rand() - 0.48) * 0.05;
    p = Math.max(1, p * (1 + drift));
    out.push({ date: d.toISOString().slice(0, 10), close: Number(p.toFixed(2)) });
  }
  out[out.length - 1].close = basePrice;
  return out;
}

function buildFiiDividends(basePrice: number, dyPct: number, seed: number): FiiDividend[] {
  const rand = seededRandom(seed);
  const monthlyPerShare = (basePrice * dyPct) / 100 / 12;
  const out: FiiDividend[] = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now);
    d.setMonth(now.getMonth() - i);
    d.setDate(rand() > 0.5 ? 10 : 15);
    out.push({
      paidAt: d.toISOString().slice(0, 10),
      amount: Number((monthlyPerShare * (0.85 + rand() * 0.3)).toFixed(2)),
    });
  }
  return out;
}

interface FiiSeed {
  ticker: string;
  name: string;
  segment: FiiSegment;
  price: number;
  dy: number;
  pvp: number;
  capRate: number;
  vacancy: number;
  avgVacancy: number;
  dailyLiquidity: number;
  shareholders: number;
  description: string;
}

const seeds: FiiSeed[] = [
  {
    ticker: "KNCR11",
    name: "Kinea Rendimentos Imobiliários",
    segment: "Papel",
    price: 107.77,
    dy: 12.5,
    pvp: 1.02,
    capRate: 0,
    vacancy: 0,
    avgVacancy: 0,
    dailyLiquidity: 8_500_000,
    shareholders: 320_000,
    description:
      "Fundo de investimento imobiliário do tipo papel, focado em ativos de renda fixa imobiliária, principalmente CRI e títulos lastreados em imóveis.",
  },
  {
    ticker: "HGLG11",
    name: "CSHG Logística",
    segment: "Logístico",
    price: 150.32,
    dy: 8.9,
    pvp: 1.15,
    capRate: 7.2,
    vacancy: 4.8,
    avgVacancy: 3.5,
    dailyLiquidity: 6_200_000,
    shareholders: 180_000,
    description:
      "Fundo de galpões logísticos com foco em imóveis de alto padrão localizados em regiões estratégicas do Estado de São Paulo.",
  },
  {
    ticker: "XPML11",
    name: "XP Malls",
    segment: "Shopping",
    price: 105.7,
    dy: 9.2,
    pvp: 1.08,
    capRate: 8.1,
    vacancy: 5.2,
    avgVacancy: 4.1,
    dailyLiquidity: 4_800_000,
    shareholders: 150_000,
    description:
      "Fundo especializado em shopping centers, com participação em empreendimentos de alto padrão em diversas regiões do Brasil.",
  },
  {
    ticker: "KNIP11",
    name: "Kinea Índice de Preços",
    segment: "Papel",
    price: 92.81,
    dy: 11.8,
    pvp: 0.98,
    capRate: 0,
    vacancy: 0,
    avgVacancy: 0,
    dailyLiquidity: 5_100_000,
    shareholders: 210_000,
    description:
      "Fundo de investimento em CRI atrelados a índices de preços (IPCA), buscando proteção inflacionária e renda mensal.",
  },
  {
    ticker: "BTLG11",
    name: "BTG Pactual Logística",
    segment: "Logístico",
    price: 102.6,
    dy: 9.5,
    pvp: 1.12,
    capRate: 7.8,
    vacancy: 3.2,
    avgVacancy: 2.8,
    dailyLiquidity: 3_900_000,
    shareholders: 130_000,
    description:
      "Fundo de galpões logísticos com portfólio diversificado de imóveis localizados em principais hubs logísticos do Brasil.",
  },
  {
    ticker: "XPLG11",
    name: "XP Log",
    segment: "Logístico",
    price: 92.32,
    dy: 10.1,
    pvp: 1.05,
    capRate: 8.4,
    vacancy: 4.5,
    avgVacancy: 3.9,
    dailyLiquidity: 3_500_000,
    shareholders: 120_000,
    description:
      "Fundo de galpões logísticos e industriais com foco em contratos atípicos e longo prazo.",
  },
  {
    ticker: "KNRI11",
    name: "Kinea Renda Imobiliária",
    segment: "Híbrido",
    price: 135.4,
    dy: 9.8,
    pvp: 1.1,
    capRate: 7.5,
    vacancy: 4.1,
    avgVacancy: 3.2,
    dailyLiquidity: 4_200_000,
    shareholders: 170_000,
    description:
      "Fundo híbrido que investe em imóveis comerciais (lajes corporativas), galpões logísticos e ativos financeiros.",
  },
  {
    ticker: "RECR11",
    name: "Rec Recebíveis",
    segment: "Papel",
    price: 89.5,
    dy: 13.2,
    pvp: 0.95,
    capRate: 0,
    vacancy: 0,
    avgVacancy: 0,
    dailyLiquidity: 7_100_000,
    shareholders: 280_000,
    description:
      "Fundo de recebíveis imobiliários com alto dividend yield, investindo em CRI e títulos do mercado secundário.",
  },
  {
    ticker: "VILG11",
    name: "Vinci Logística",
    segment: "Logístico",
    price: 95.8,
    dy: 10.4,
    pvp: 1.07,
    capRate: 8.2,
    vacancy: 3.8,
    avgVacancy: 3.1,
    dailyLiquidity: 2_800_000,
    shareholders: 95_000,
    description:
      "Fundo de galpões logísticos com presença em São Paulo, Rio de Janeiro e Minas Gerais.",
  },
  {
    ticker: "HSML11",
    name: "Hsi Malls",
    segment: "Shopping",
    price: 88.2,
    dy: 10.8,
    pvp: 0.92,
    capRate: 9.1,
    vacancy: 6.8,
    avgVacancy: 5.4,
    dailyLiquidity: 1_900_000,
    shareholders: 75_000,
    description:
      "Fundo de shopping centers com portfólio diversificado em centros de compras de médio e grande porte.",
  },
  {
    ticker: "MCCI11",
    name: "Mauá Capital",
    segment: "Papel",
    price: 84.3,
    dy: 14.1,
    pvp: 0.88,
    capRate: 0,
    vacancy: 0,
    avgVacancy: 0,
    dailyLiquidity: 2_100_000,
    shareholders: 85_000,
    description:
      "Fundo de recebíveis imobiliários com gestão ativa, buscando alto retorno através de CRI e operações estruturadas.",
  },
  {
    ticker: "HGRE11",
    name: "CSHG Real Estate",
    segment: "Tijolo",
    price: 118.5,
    dy: 8.4,
    pvp: 0.85,
    capRate: 6.9,
    vacancy: 8.5,
    avgVacancy: 7.2,
    dailyLiquidity: 3_200_000,
    shareholders: 110_000,
    description:
      "Fundo de lajes corporativas com imóveis comerciais de alto padrão em São Paulo e Rio de Janeiro.",
  },
  {
    ticker: "RBRF11",
    name: "RBR Properties",
    segment: "Tijolo",
    price: 72.4,
    dy: 11.5,
    pvp: 0.78,
    capRate: 7.8,
    vacancy: 12.4,
    avgVacancy: 10.8,
    dailyLiquidity: 1_500_000,
    shareholders: 65_000,
    description:
      "Fundo de lajes corporativas com desconto patrimonial, investindo em imóveis comerciais com potencial de valorização.",
  },
  {
    ticker: "PVBI11",
    name: "VBI Prime Properties",
    segment: "Tijolo",
    price: 95.1,
    dy: 9.6,
    pvp: 0.95,
    capRate: 7.4,
    vacancy: 7.1,
    avgVacancy: 5.8,
    dailyLiquidity: 2_400_000,
    shareholders: 88_000,
    description: "Fundo de lajes corporativas AAA localizadas nos melhores endereços de São Paulo.",
  },
  {
    ticker: "FIIB11",
    name: "Fiibrasil",
    segment: "Fundos de Fundos",
    price: 78.9,
    dy: 11.2,
    pvp: 0.91,
    capRate: 0,
    vacancy: 0,
    avgVacancy: 0,
    dailyLiquidity: 1_200_000,
    shareholders: 55_000,
    description:
      "Fundo de fundos que investe em cotas de outros FIIs, proporcionando diversificação e gestão profissional.",
  },
  {
    ticker: "KFOF11",
    name: "Kinea Fundos de Fundos",
    segment: "Fundos de Fundos",
    price: 82.6,
    dy: 10.5,
    pvp: 0.96,
    capRate: 0,
    vacancy: 0,
    avgVacancy: 0,
    dailyLiquidity: 1_800_000,
    shareholders: 72_000,
    description:
      "Fundo de fundos que investe em carteira diversificada de FIIs, com gestão ativa da Kinea.",
  },
  {
    ticker: "GARE11",
    name: "Guardian Realty",
    segment: "Hospitalar",
    price: 68.5,
    dy: 12.8,
    pvp: 0.84,
    capRate: 9.5,
    vacancy: 2.1,
    avgVacancy: 1.5,
    dailyLiquidity: 850_000,
    shareholders: 42_000,
    description:
      "Fundo especializado em imóveis hospitalares e de saúde, com contratos de longo prazo e baixa vacância.",
  },
  {
    ticker: "EDUC11",
    name: "Educrend",
    segment: "Educacional",
    price: 74.2,
    dy: 11.9,
    pvp: 0.82,
    capRate: 8.8,
    vacancy: 3.5,
    avgVacancy: 2.9,
    dailyLiquidity: 620_000,
    shareholders: 38_000,
    description:
      "Fundo de imóveis educacionais, com foco em universidades e faculdades com contratos de locação de longo prazo.",
  },
  {
    ticker: "JSRE11",
    name: "JS Real Estate",
    segment: "Tijolo",
    price: 85.3,
    dy: 10.2,
    pvp: 0.88,
    capRate: 8.0,
    vacancy: 9.8,
    avgVacancy: 8.4,
    dailyLiquidity: 1_100_000,
    shareholders: 48_000,
    description:
      "Fundo de lajes corporativas com portfólio diversificado em São Paulo, Rio de Janeiro e Brasília.",
  },
  {
    ticker: "BBPO11",
    name: "BB Progressivo",
    segment: "Tijolo",
    price: 98.7,
    dy: 9.4,
    pvp: 0.97,
    capRate: 7.1,
    vacancy: 6.5,
    avgVacancy: 5.2,
    dailyLiquidity: 2_900_000,
    shareholders: 105_000,
    description:
      "Fundo de lajes corporativas com imóveis de alto padrão, gerido pelo Banco do Brasil.",
  },
];

export const FIIS: Fii[] = seeds.map((s, i) => ({
  ticker: s.ticker,
  name: s.name,
  segment: s.segment,
  price: s.price,
  dy: s.dy,
  pvp: s.pvp,
  capRate: s.capRate,
  vacancy: s.vacancy,
  avgVacancy: s.avgVacancy,
  dailyLiquidity: s.dailyLiquidity,
  shareholders: s.shareholders,
  dividendHistory: buildFiiDividends(s.price, s.dy, i * 13 + 7),
  history: buildFiiHistory(s.price, i * 17 + 3),
  description: s.description,
}));

export const FIIS_BY_TICKER: Record<string, Fii> = Object.fromEntries(
  FIIS.map((f) => [f.ticker, f]),
);

export function getFii(ticker: string): Fii | undefined {
  return FIIS_BY_TICKER[ticker.toUpperCase()];
}
