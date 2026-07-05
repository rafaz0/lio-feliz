export interface IndicatorResult {
  sma20: (number | null)[];
  sma50: (number | null)[];
  sma200: (number | null)[];
  ema12: (number | null)[];
  ema26: (number | null)[];
  rsi14: (number | null)[];
  macd: (number | null)[];
  macdSignal: (number | null)[];
  macdHistogram: (number | null)[];
  bbUpper: (number | null)[];
  bbMiddle: (number | null)[];
  bbLower: (number | null)[];
}

export function calcSMA(data: number[], period: number): (number | null)[] {
  const result: (number | null)[] = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(null);
    } else {
      let sum = 0;
      for (let j = i - period + 1; j <= i; j++) sum += data[j];
      result.push(sum / period);
    }
  }
  return result;
}

export function calcEMA(data: number[], period: number): (number | null)[] {
  const result: (number | null)[] = [];
  const multiplier = 2 / (period + 1);
  let ema = data.slice(0, period).reduce((s, v) => s + v, 0) / period;
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(null);
    } else if (i === period - 1) {
      result.push(ema);
    } else {
      ema = (data[i] - ema) * multiplier + ema;
      result.push(ema);
    }
  }
  return result;
}

export function calcRSI(data: number[], period = 14): (number | null)[] {
  const result: (number | null)[] = [];
  if (data.length < period + 1) return data.map(() => null);
  result.push(null);
  let gains = 0, losses = 0;
  for (let i = 1; i <= period; i++) {
    const diff = data[i] - data[i - 1];
    if (diff >= 0) gains += diff; else losses -= diff;
  }
  let avgGain = gains / period;
  let avgLoss = losses / period;
  let rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
  result.push(100 - 100 / (1 + rs));
  for (let i = period + 1; i < data.length; i++) {
    const diff = data[i] - data[i - 1];
    const gain = diff >= 0 ? diff : 0;
    const loss = diff < 0 ? -diff : 0;
    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;
    rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    result.push(100 - 100 / (1 + rs));
  }
  return result;
}

export function calcMACD(data: number[]): { macd: (number | null)[]; macdSignal: (number | null)[]; macdHistogram: (number | null)[] } {
  const ema12 = calcEMA(data, 12);
  const ema26 = calcEMA(data, 26);
  const macd: (number | null)[] = [];
  for (let i = 0; i < data.length; i++) {
    if (ema12[i] === null || ema26[i] === null) macd.push(null);
    else macd.push(ema12[i]! - ema26[i]!);
  }
  const validMacd = macd.map((v, i) => v !== null ? v : 0);
  const macdSignal = calcEMA(validMacd, 9);
  const macdHistogram: (number | null)[] = [];
  for (let i = 0; i < data.length; i++) {
    if (macd[i] === null || macdSignal[i] === null) macdHistogram.push(null);
    else macdHistogram.push(macd[i]! - macdSignal[i]!);
  }
  return { macd, macdSignal, macdHistogram };
}

export function calcBollingerBands(data: number[], period = 20, multiplier = 2): { bbUpper: (number | null)[]; bbMiddle: (number | null)[]; bbLower: (number | null)[] } {
  const bbMiddle = calcSMA(data, period);
  const bbUpper: (number | null)[] = [];
  const bbLower: (number | null)[] = [];
  for (let i = 0; i < data.length; i++) {
    if (bbMiddle[i] === null) {
      bbUpper.push(null);
      bbLower.push(null);
    } else {
      let sumSq = 0;
      let count = 0;
      for (let j = Math.max(0, i - period + 1); j <= i; j++) {
        sumSq += (data[j] - bbMiddle[i]!) ** 2;
        count++;
      }
      const std = Math.sqrt(sumSq / count);
      bbUpper.push(bbMiddle[i]! + multiplier * std);
      bbLower.push(bbMiddle[i]! - multiplier * std);
    }
  }
  return { bbUpper, bbMiddle, bbLower };
}

export function calcAll(data: number[]): IndicatorResult {
  if (data.length < 5) {
    const fill: (number | null)[] = data.map(() => null);
    return { sma20: fill, sma50: fill, sma200: fill, ema12: fill, ema26: fill, rsi14: fill, macd: fill, macdSignal: fill, macdHistogram: fill, bbUpper: fill, bbMiddle: fill, bbLower: fill };
  }
  return {
    sma20: calcSMA(data, 20),
    sma50: calcSMA(data, 50),
    sma200: calcSMA(data, 200),
    ema12: calcEMA(data, 12),
    ema26: calcEMA(data, 26),
    rsi14: calcRSI(data),
    ...calcMACD(data),
    ...calcBollingerBands(data),
  };
}
