export interface RecommendedHolding {
  ticker: string;
  name: string;
  weight: number;
  dy: number;
  pl: number;
}

export interface RecommendedPortfolio {
  id: string;
  name: string;
  description: string;
  risk: "conservador" | "moderado" | "agressivo";
  focus: string;
  holders: number;
  dy: number;
  totalReturn1y: number;
  totalReturn5y: number;
  holdings: RecommendedHolding[];
}

export const RECOMMENDED_PORTFOLIOS: RecommendedPortfolio[] = [
  {
    id: "dividendos",
    name: "Carteira Dividendos",
    description: "Foco em ações com histórico consistente de distribuição de lucros e DY acima de 6%",
    risk: "conservador",
    focus: "Renda passiva mensal",
    holders: 2834,
    dy: 8.2,
    totalReturn1y: 8.5,
    totalReturn5y: 48.2,
    holdings: [
      { ticker: "PETR4", name: "Petrobras", weight: 20, dy: 12.5, pl: 4.8 },
      { ticker: "VALE3", name: "Vale", weight: 18, dy: 8.1, pl: 5.2 },
      { ticker: "ITUB4", name: "Itaú Unibanco", weight: 16, dy: 7.2, pl: 8.1 },
      { ticker: "BBAS3", name: "Banco do Brasil", weight: 15, dy: 9.4, pl: 5.6 },
      { ticker: "TAEE11", name: "Taesa", weight: 12, dy: 10.1, pl: 7.3 },
      { ticker: "BBSE3", name: "BB Seguridade", weight: 10, dy: 7.8, pl: 9.2 },
      { ticker: "SANB11", name: "Santander", weight: 9, dy: 6.5, pl: 9.8 },
    ],
  },
  {
    id: "valor",
    name: "Carteira Valor",
    description: "Empresas negociadas abaixo do valor intrínseco com P/L baixo e margens sólidas",
    risk: "moderado",
    focus: "Apreciação + valor justo",
    holders: 1956,
    dy: 4.5,
    totalReturn1y: 14.2,
    totalReturn5y: 62.8,
    holdings: [
      { ticker: "WEGE3", name: "WEG", weight: 20, dy: 2.1, pl: 28.4 },
      { ticker: "VALE3", name: "Vale", weight: 18, dy: 8.1, pl: 5.2 },
      { ticker: "ITSA4", name: "Itaúsa", weight: 16, dy: 5.3, pl: 11.2 },
      { ticker: "RENT3", name: "Localiza", weight: 14, dy: 1.8, pl: 22.6 },
      { ticker: "BBAS3", name: "Banco do Brasil", weight: 12, dy: 9.4, pl: 5.6 },
      { ticker: "SUZB3", name: "Suzano", weight: 10, dy: 3.2, pl: 14.8 },
      { ticker: "CSAN3", name: "Cosan", weight: 10, dy: 4.1, pl: 12.3 },
    ],
  },
  {
    id: "crescimento",
    name: "Carteira Crescimento",
    description: "Empresas com alto potencial de expansão, receita crescente e vantagens competitivas",
    risk: "agressivo",
    focus: "Crescimento acelerado",
    holders: 1421,
    dy: 1.8,
    totalReturn1y: 22.5,
    totalReturn5y: 95.4,
    holdings: [
      { ticker: "WEGE3", name: "WEG", weight: 22, dy: 2.1, pl: 28.4 },
      { ticker: "RENT3", name: "Localiza", weight: 18, dy: 1.8, pl: 22.6 },
      { ticker: "MGLU3", name: "Magazine Luiza", weight: 16, dy: 0.5, pl: 35.2 },
      { ticker: "PRIO3", name: "PetroRio", weight: 14, dy: 3.2, pl: 7.8 },
      { ticker: "SUZB3", name: "Suzano", weight: 12, dy: 3.2, pl: 14.8 },
      { ticker: "RAIZ4", name: "Raízen", weight: 10, dy: 2.5, pl: 18.6 },
      { ticker: "VIVA3", name: "Vivara", weight: 8, dy: 1.1, pl: 32.4 },
    ],
  },
  {
    id: "small-caps",
    name: "Carteira Small Caps",
    description: "Empresas de menor capitalização com potencial de valuation e crescimento acima da média",
    risk: "agressivo",
    focus: "Potencial de valuation",
    holders: 978,
    dy: 2.5,
    totalReturn1y: 18.9,
    totalReturn5y: 110.2,
    holdings: [
      { ticker: "PRIO3", name: "PetroRio", weight: 20, dy: 3.2, pl: 7.8 },
      { ticker: "MGLU3", name: "Magazine Luiza", weight: 18, dy: 0.5, pl: 35.2 },
      { ticker: "RAIZ4", name: "Raízen", weight: 16, dy: 2.5, pl: 18.6 },
      { ticker: "VIVA3", name: "Vivara", weight: 14, dy: 1.1, pl: 32.4 },
      { ticker: "CSAN3", name: "Cosan", weight: 12, dy: 4.1, pl: 12.3 },
      { ticker: "MRFG3", name: "Marfrig", weight: 10, dy: 2.8, pl: 9.5 },
      { ticker: "BRFS3", name: "BRF", weight: 10, dy: 1.5, pl: 20.1 },
    ],
  },
  {
    id: "fiis",
    name: "Carteira FIIs",
    description: "Fundos imobiliários de diferentes segmentos com DY acima de 8% e vacância controlada",
    risk: "moderado",
    focus: "Renda imobiliária",
    holders: 2134,
    dy: 9.5,
    totalReturn1y: 6.2,
    totalReturn5y: 35.8,
    holdings: [
      { ticker: "KNRI11", name: "Kinea Rendimentos", weight: 20, dy: 8.2, pl: 8.5 },
      { ticker: "HGLG11", name: "CSHG Logística", weight: 18, dy: 8.9, pl: 8.1 },
      { ticker: "XPLG11", name: "XP Log", weight: 16, dy: 9.1, pl: 7.9 },
      { ticker: "KNCR11", name: "Kinea Crédito", weight: 14, dy: 10.2, pl: 7.1 },
      { ticker: "HGRE11", name: "CSHG Real Estate", weight: 12, dy: 8.5, pl: 8.3 },
      { ticker: "BCFF11", name: "BTG Fundo de Fundos", weight: 10, dy: 9.8, pl: 7.5 },
      { ticker: "RBRF11", name: "RBR Rendimentos", weight: 10, dy: 10.5, pl: 6.9 },
    ],
  },
];
