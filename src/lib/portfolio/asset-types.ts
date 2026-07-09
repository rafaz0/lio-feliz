import type { AssetType } from "./models";

const KNOWN_STOCK_US = new Set([
  "AAPL","MSFT","GOOGL","GOOG","AMZN","NVDA","META","TSLA","BRK.B",
  "JPM","V","WMT","JNJ","PG","XOM","UNH","HD","KO","PEP","AVGO",
  "ORCL","CRM","AMD","NFLX","DIS","ADBE","INTC","CMCSA","BA","COST",
  "TMO","ABBV","MRK","CVX","WFC","T","ABT","LLY","QCOM","FANG",
]);

const KNOWN_REITS = new Set([
  "O","PLD","AMT","WELL","EQIX","SPG","PSA","CCI","DLR","AVB","EQR","VTR",
  "ESS","UDR","INVH","MAA","CPT","HST","WPC","FRT","REG",
]);

const KNOWN_ETF_INTL = new Set([
  "VT","VTI","VXUS","BND","SPY","QQQ","VOO","IVV","IEFA","EEM","GLD","SCHD","VNQ",
  "IJR","IWM","XLF","XLK","XLE","XLI","XLV","XLY","XLU","XLP","XLB","XLRE",
  "VIG","VYM","DGRO","DVY","SCHH","ICLN","TAN","LIT","ARKK","ARKW",
]);

const KNOWN_ETF_BR = new Set(["BOVA11","SMAL11","HASH11","IVVB11","WRLD11","BBSD11","FIND11","GOLD11"]);

const KNOWN_BDR = new Set(["AAPL34","MSFT34","AMZO34","NVDC34","MELI34","GOOG34","TSLA34","KEPL34"]);

const KNOWN_BR_STOCKS = new Set([
  "PETR3","PETR4","VALE3","ITUB3","ITUB4","BBDC3","BBDC4","BBAS3","ABEV3","WEGE3",
  "RENT3","GOAU3","GOAU4","GGBR3","GGBR4","CSNA3","USIM3","USIM4","CMIG3","CMIG4",
  "ELET3","ELET6","EMBR3","JBSS3","BRFS3","B3SA3","RADL3","HAPV3","RAIL3","SUZB3",
  "LREN3","MGLU3","PCAR3","AZUL4","GOLL4","CVCB3","VVAR3","MRFG3","BEEF3","TOTS3",
  "TIMS3","VIVT3","ALOS3","RLOG3","SBSP3","EGIE3","CPFE3","NEOE3","ENGI11",
  "EQTL3","COGN3","FLRY3","HYPE3","PRIO3","PETZ3","BOVA11","SMAL11","HASH11",
  "ARZZ3","AMAR3","SLCE3","KLBN11","LEVE3","FRAS3","TUPY3","ETER3",
  "CGRA3","CGRA4","CRPG3","CRPG4","DOHL3","DOHL4","EUCA3","EUCA4",
]);

export function inferAssetType(ticker: string): AssetType {
  const upper = ticker.toUpperCase();
  if (KNOWN_STOCK_US.has(upper)) return "stock_us";
  if (KNOWN_REITS.has(upper)) return "reit";
  if (KNOWN_ETF_INTL.has(upper)) return "etf_internacional";
  if (KNOWN_ETF_BR.has(upper)) return "etf";
  if (KNOWN_BDR.has(upper)) return "bdr";
  if (KNOWN_BR_STOCKS.has(upper)) return "stock";
  if (/^\w+11$/.test(upper) && !KNOWN_ETF_BR.has(upper) && !KNOWN_BDR.has(upper)) return "fii";
  if (/^[A-Z0-9]{4,6}\d$/.test(upper)) return "stock";
  if (/^[A-Z]{3,6}3\d$/.test(upper)) return "bdr";
  if (/^(BTC|ETH|SOL|ADA|DOT|AVAX|MATIC|LINK|XRP|DOGE|USDT|USDC|BNB)-?/.test(upper)) return "crypto";
  if (/^(TESOURO|CDB|LCI|LCA|CRI|CRA|DEBENTURE|LF|LIG|NTN)/.test(upper)) return "fixed_income";
  if (/^[A-Z0-9]{2,6}\d{2}$/.test(upper)) return "fixed_income";
  if (/^[A-Z]{1,5}(\.[A-Z]{1,2})?$/.test(upper)) return "stock_us";
  return "other";
}
