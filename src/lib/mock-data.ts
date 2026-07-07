// Mock market data for the MVP. Prices in BRL.
export type Sector =
  | "Petróleo e Gás"
  | "Mineração"
  | "Bancos"
  | "Varejo"
  | "Energia Elétrica"
  | "Siderurgia"
  | "Bens Industriais"
  | "Consumo"
  | "Saúde"
  | "Telecom"
  | "Papel e Celulose"
  | "Criptomoedas"
  | "Internacional";

export interface AssetFundamentals {
  pl: number;
  pvp: number;
  dy: number; // percent
  roe: number; // percent
  roic: number; // percent
  margemLiquida: number; // percent
  divLiquidaEbitda: number;
  lpa: number;
  vpa: number;
  marketCap: number; // BRL
  evEbitda: number;
  payout: number; // percent
  psr: number;
  dividendCagr: number; // percent
}

export interface Dividend {
  paidAt: string; // yyyy-mm-dd
  type: "Dividendo" | "JCP";
  amount: number; // BRL per share
}

export interface Asset {
  ticker: string;
  name: string;
  sector: Sector;
  price: number;
  changeDayPct: number; // percent
  description: string;
  fundamentals: AssetFundamentals;
  history: { date: string; close: number }[]; // 12 months
  dividends: Dividend[];
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function buildHistory(basePrice: number, seed: number): { date: string; close: number }[] {
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
  // Force last point to the current price so charts align with header
  out[out.length - 1].close = basePrice;
  return out;
}

function buildDividends(basePrice: number, dyPct: number, seed: number): Dividend[] {
  const rand = seededRandom(seed);
  const annualPerShare = (basePrice * dyPct) / 100;
  const perQuarter = annualPerShare / 4;
  const out: Dividend[] = [];
  const now = new Date();
  for (let i = 0; i < 4; i++) {
    const d = new Date(now);
    d.setMonth(now.getMonth() - i * 3);
    out.push({
      paidAt: d.toISOString().slice(0, 10),
      type: rand() > 0.5 ? "Dividendo" : "JCP",
      amount: Number((perQuarter * (0.7 + rand() * 0.6)).toFixed(3)),
    });
  }
  return out;
}

interface Seed {
  ticker: string;
  name: string;
  sector: Sector;
  price: number;
  changeDayPct: number;
  description: string;
  f: Omit<AssetFundamentals, "dividendCagr" | "evEbitda" | "payout" | "psr">;
}

const seeds: Seed[] = [
  {
    ticker: "PETR4",
    name: "Petrobras PN",
    sector: "Petróleo e Gás",
    price: 38.72,
    changeDayPct: 1.24,
    description:
      "A Petróleo Brasileiro S.A. (Petrobras) é a maior empresa de energia do Brasil, com atuação em exploração, produção, refino, comercialização e transporte de petróleo, gás natural e derivados.",
    f: {
      pl: 4.2,
      pvp: 1.1,
      dy: 14.8,
      roe: 27.3,
      roic: 21.4,
      margemLiquida: 22.1,
      divLiquidaEbitda: 0.9,
      lpa: 9.21,
      vpa: 35.4,
      marketCap: 505_000_000_000,
    },
  },
  {
    ticker: "VALE3",
    name: "Vale ON",
    sector: "Mineração",
    price: 62.45,
    changeDayPct: -0.87,
    description:
      "A Vale S.A. é uma das maiores mineradoras do mundo, líder na produção de minério de ferro, pelotas e níquel, com operações em cinco continentes.",
    f: {
      pl: 5.6,
      pvp: 1.4,
      dy: 9.7,
      roe: 24.1,
      roic: 18.2,
      margemLiquida: 25.4,
      divLiquidaEbitda: 0.6,
      lpa: 11.15,
      vpa: 44.6,
      marketCap: 285_000_000_000,
    },
  },
  {
    ticker: "ITUB4",
    name: "Itaú Unibanco PN",
    sector: "Bancos",
    price: 34.18,
    changeDayPct: 0.45,
    description:
      "O Itaú Unibanco é o maior banco privado do Brasil, oferecendo serviços financeiros a pessoas físicas, jurídicas e institucionais em todo o país e no exterior.",
    f: {
      pl: 9.1,
      pvp: 1.8,
      dy: 5.6,
      roe: 20.4,
      roic: 15.1,
      margemLiquida: 27.8,
      divLiquidaEbitda: 0,
      lpa: 3.75,
      vpa: 19.1,
      marketCap: 335_000_000_000,
    },
  },
  {
    ticker: "BBAS3",
    name: "Banco do Brasil ON",
    sector: "Bancos",
    price: 27.94,
    changeDayPct: -0.32,
    description:
      "O Banco do Brasil é uma instituição financeira controlada pela União, com atuação nacional em crédito, investimentos, seguros e cartões.",
    f: {
      pl: 4.7,
      pvp: 0.9,
      dy: 10.2,
      roe: 20.9,
      roic: 12.4,
      margemLiquida: 24.6,
      divLiquidaEbitda: 0,
      lpa: 5.94,
      vpa: 30.6,
      marketCap: 158_000_000_000,
    },
  },
  {
    ticker: "BBDC4",
    name: "Bradesco PN",
    sector: "Bancos",
    price: 14.62,
    changeDayPct: 0.75,
    description:
      "O Bradesco é um dos maiores conglomerados financeiros do Brasil, com forte atuação em varejo bancário, seguros e previdência.",
    f: {
      pl: 8.4,
      pvp: 1.0,
      dy: 6.8,
      roe: 12.1,
      roic: 8.5,
      margemLiquida: 15.4,
      divLiquidaEbitda: 0,
      lpa: 1.74,
      vpa: 14.7,
      marketCap: 155_000_000_000,
    },
  },
  {
    ticker: "WEGE3",
    name: "WEG ON",
    sector: "Bens Industriais",
    price: 39.85,
    changeDayPct: 1.68,
    description:
      "A WEG é uma das maiores fabricantes de equipamentos eletroeletrônicos industriais do mundo, com atuação em motores, geradores, transformadores e automação.",
    f: {
      pl: 32.1,
      pvp: 7.4,
      dy: 1.5,
      roe: 24.6,
      roic: 22.1,
      margemLiquida: 15.2,
      divLiquidaEbitda: 0.1,
      lpa: 1.24,
      vpa: 5.4,
      marketCap: 167_000_000_000,
    },
  },
  {
    ticker: "MGLU3",
    name: "Magazine Luiza ON",
    sector: "Varejo",
    price: 8.24,
    changeDayPct: -2.15,
    description:
      "A Magazine Luiza é uma das maiores varejistas do Brasil, com plataforma multicanal integrando lojas físicas, e-commerce e marketplace.",
    f: {
      pl: 42.3,
      pvp: 2.1,
      dy: 0.2,
      roe: 5.1,
      roic: 4.3,
      margemLiquida: 1.8,
      divLiquidaEbitda: 2.4,
      lpa: 0.19,
      vpa: 3.9,
      marketCap: 55_000_000_000,
    },
  },
  {
    ticker: "ITSA4",
    name: "Itaúsa PN",
    sector: "Bancos",
    price: 10.75,
    changeDayPct: 0.28,
    description:
      "A Itaúsa é uma holding com participações no Itaú Unibanco, Alpargatas, Duratex, Copagaz, entre outras, com foco em investimentos de longo prazo.",
    f: {
      pl: 7.1,
      pvp: 1.1,
      dy: 7.4,
      roe: 15.4,
      roic: 12.1,
      margemLiquida: 42.1,
      divLiquidaEbitda: 0,
      lpa: 1.51,
      vpa: 9.6,
      marketCap: 116_000_000_000,
    },
  },
  {
    ticker: "B3SA3",
    name: "B3 ON",
    sector: "Bens Industriais",
    price: 12.35,
    changeDayPct: -0.65,
    description:
      "A B3 é a bolsa de valores do Brasil, responsável pela negociação, compensação e liquidação de ativos financeiros e commodities.",
    f: {
      pl: 15.3,
      pvp: 2.4,
      dy: 6.1,
      roe: 15.7,
      roic: 12.4,
      margemLiquida: 52.8,
      divLiquidaEbitda: 1.2,
      lpa: 0.81,
      vpa: 5.1,
      marketCap: 74_000_000_000,
    },
  },
  {
    ticker: "SUZB3",
    name: "Suzano ON",
    sector: "Papel e Celulose",
    price: 54.9,
    changeDayPct: 2.34,
    description:
      "A Suzano é a maior produtora mundial de celulose de eucalipto, com operações florestais e industriais integradas no Brasil.",
    f: {
      pl: 6.8,
      pvp: 1.6,
      dy: 2.4,
      roe: 24.2,
      roic: 15.6,
      margemLiquida: 21.8,
      divLiquidaEbitda: 2.8,
      lpa: 8.07,
      vpa: 34.3,
      marketCap: 74_000_000_000,
    },
  },
  {
    ticker: "ELET3",
    name: "Eletrobras ON",
    sector: "Energia Elétrica",
    price: 41.2,
    changeDayPct: 0.98,
    description:
      "A Eletrobras é a maior empresa de energia elétrica da América Latina, com atuação em geração, transmissão e comercialização.",
    f: {
      pl: 11.4,
      pvp: 0.9,
      dy: 3.2,
      roe: 8.4,
      roic: 6.8,
      margemLiquida: 18.4,
      divLiquidaEbitda: 2.1,
      lpa: 3.61,
      vpa: 45.8,
      marketCap: 95_000_000_000,
    },
  },
  {
    ticker: "CSNA3",
    name: "CSN ON",
    sector: "Siderurgia",
    price: 14.85,
    changeDayPct: -1.42,
    description:
      "A Companhia Siderúrgica Nacional (CSN) atua em siderurgia, mineração, cimento, energia e logística.",
    f: {
      pl: 8.9,
      pvp: 1.1,
      dy: 4.3,
      roe: 12.4,
      roic: 8.6,
      margemLiquida: 9.2,
      divLiquidaEbitda: 3.4,
      lpa: 1.67,
      vpa: 13.5,
      marketCap: 21_000_000_000,
    },
  },
  {
    ticker: "USIM5",
    name: "Usiminas PNA",
    sector: "Siderurgia",
    price: 6.42,
    changeDayPct: -0.78,
    description:
      "A Usiminas é uma siderúrgica brasileira que produz aços planos para indústrias como automotiva, linha branca e construção civil.",
    f: {
      pl: 12.6,
      pvp: 0.5,
      dy: 3.8,
      roe: 4.1,
      roic: 3.2,
      margemLiquida: 3.8,
      divLiquidaEbitda: 1.5,
      lpa: 0.51,
      vpa: 12.4,
      marketCap: 8_000_000_000,
    },
  },
  {
    ticker: "GGBR4",
    name: "Gerdau PN",
    sector: "Siderurgia",
    price: 18.34,
    changeDayPct: 0.42,
    description:
      "A Gerdau é a maior produtora de aços longos das Américas e uma das maiores fornecedoras de aços especiais do mundo.",
    f: {
      pl: 6.1,
      pvp: 0.9,
      dy: 8.2,
      roe: 15.6,
      roic: 12.8,
      margemLiquida: 10.4,
      divLiquidaEbitda: 0.4,
      lpa: 3.01,
      vpa: 20.1,
      marketCap: 39_000_000_000,
    },
  },
  {
    ticker: "PRIO3",
    name: "PRIO ON",
    sector: "Petróleo e Gás",
    price: 42.1,
    changeDayPct: 1.85,
    description:
      "A PRIO é a maior empresa independente de exploração e produção de petróleo e gás natural do Brasil.",
    f: {
      pl: 5.4,
      pvp: 2.1,
      dy: 3.2,
      roe: 42.1,
      roic: 34.5,
      margemLiquida: 44.2,
      divLiquidaEbitda: 0.8,
      lpa: 7.8,
      vpa: 20.0,
      marketCap: 36_000_000_000,
    },
  },
  {
    ticker: "RENT3",
    name: "Localiza ON",
    sector: "Consumo",
    price: 41.85,
    changeDayPct: -0.55,
    description:
      "A Localiza é a maior empresa de aluguel de carros e gestão de frotas da América Latina.",
    f: {
      pl: 18.4,
      pvp: 2.6,
      dy: 1.4,
      roe: 15.2,
      roic: 10.4,
      margemLiquida: 12.8,
      divLiquidaEbitda: 3.6,
      lpa: 2.27,
      vpa: 16.1,
      marketCap: 42_000_000_000,
    },
  },
  {
    ticker: "ABEV3",
    name: "Ambev ON",
    sector: "Consumo",
    price: 13.24,
    changeDayPct: 0.15,
    description:
      "A Ambev é a maior fabricante de bebidas da América Latina, com portfólio que inclui Skol, Brahma, Antarctica, Stella Artois e Corona.",
    f: {
      pl: 11.8,
      pvp: 2.1,
      dy: 5.4,
      roe: 18.4,
      roic: 15.2,
      margemLiquida: 21.4,
      divLiquidaEbitda: 0,
      lpa: 1.12,
      vpa: 6.3,
      marketCap: 208_000_000_000,
    },
  },
  {
    ticker: "HAPV3",
    name: "Hapvida ON",
    sector: "Saúde",
    price: 3.68,
    changeDayPct: -1.08,
    description:
      "A Hapvida é uma das maiores operadoras de saúde do Brasil, com atuação em planos de saúde, odontológicos e rede própria de hospitais.",
    f: {
      pl: 24.6,
      pvp: 1.4,
      dy: 0,
      roe: 5.8,
      roic: 4.6,
      margemLiquida: 4.2,
      divLiquidaEbitda: 2.1,
      lpa: 0.15,
      vpa: 2.6,
      marketCap: 27_000_000_000,
    },
  },
  {
    ticker: "VIVT3",
    name: "Telefônica Brasil ON",
    sector: "Telecom",
    price: 51.2,
    changeDayPct: 0.62,
    description:
      "A Telefônica Brasil (Vivo) é a maior operadora de telecomunicações do país, com serviços de telefonia, banda larga e TV por assinatura.",
    f: {
      pl: 15.4,
      pvp: 1.4,
      dy: 6.8,
      roe: 8.9,
      roic: 7.1,
      margemLiquida: 12.4,
      divLiquidaEbitda: 0.6,
      lpa: 3.32,
      vpa: 36.6,
      marketCap: 84_000_000_000,
    },
  },
  {
    ticker: "CMIG4",
    name: "Cemig PN",
    sector: "Energia Elétrica",
    price: 11.85,
    changeDayPct: 0.32,
    description:
      "A Companhia Energética de Minas Gerais (Cemig) atua em geração, transmissão, distribuição e comercialização de energia elétrica.",
    f: {
      pl: 5.1,
      pvp: 1.1,
      dy: 11.4,
      roe: 21.4,
      roic: 14.6,
      margemLiquida: 17.2,
      divLiquidaEbitda: 1.4,
      lpa: 2.32,
      vpa: 10.8,
      marketCap: 33_000_000_000,
    },
  },
  {
    ticker: "TAEE11",
    name: "Taesa UNT",
    sector: "Energia Elétrica",
    price: 35.42,
    changeDayPct: -0.28,
    description: "A Taesa é uma das maiores empresas de transmissão de energia elétrica do Brasil.",
    f: {
      pl: 8.2,
      pvp: 1.9,
      dy: 10.8,
      roe: 22.4,
      roic: 12.6,
      margemLiquida: 44.8,
      divLiquidaEbitda: 2.8,
      lpa: 4.32,
      vpa: 18.6,
      marketCap: 12_000_000_000,
    },
  },
];

export const ASSETS: Asset[] = seeds.map((s, i) => {
  const pl = s.f.pl;
  const pvp = s.f.pvp;
  const dy = s.f.dy;
  const roe = s.f.roe;
  const margemLiquida = s.f.margemLiquida;
  const divLiqEbitda = s.f.divLiquidaEbitda;
  const lpa = s.f.lpa;
  const vpa = s.f.vpa;
  const marketCap = s.f.marketCap;

  const payout = dy > 0 && roe > 0 ? (dy / roe) * 100 : 0;
  const evEbitda = divLiqEbitda > 0 ? pl + divLiqEbitda * 0.4 : pl * 1.05;
  const psr = margemLiquida > 0 ? pl / (margemLiquida / 100) : pl * 5;

  const cagrSeed = [
    4.5, 3.2, 6.1, 5.8, 2.4, 8.2, 1.5, 4.9, 7.3, 3.8, 6.5, 2.1, 5.4, 3.6, 7.8, 4.2, 8.5, 6.9, 5.1,
    3.1,
  ];
  const dividendCagr = cagrSeed[i % cagrSeed.length];

  return {
    ticker: s.ticker,
    name: s.name,
    sector: s.sector,
    price: s.price,
    changeDayPct: s.changeDayPct,
    description: s.description,
    fundamentals: { ...s.f, evEbitda, payout, psr, dividendCagr },
    history: buildHistory(s.price, i * 31 + 7),
    dividends: buildDividends(s.price, s.f.dy, i * 17 + 3),
  };
});

export const ASSETS_BY_TICKER: Record<string, Asset> = Object.fromEntries(
  ASSETS.map((a) => [a.ticker, a]),
);

export function getAsset(ticker: string): Asset | undefined {
  return ASSETS_BY_TICKER[ticker.toUpperCase()];
}
