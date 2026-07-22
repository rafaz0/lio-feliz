export const BACKTEST_QUERY_KEYS = {
  all: ["backtests"] as const,
  list: () => ["backtests", "list"] as const,
  result: (backtestId: string) => ["backtests", "result", backtestId] as const,
};
