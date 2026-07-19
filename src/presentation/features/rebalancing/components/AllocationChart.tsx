import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";
import type { AllocationViewModel } from "../types/rebalancing.view-model";

interface AllocationChartProps {
  alocacao: AllocationViewModel[];
}

const CORES = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function AllocationChart({ alocacao }: AllocationChartProps) {
  const chartData = alocacao.map((item, i) => ({
    classe: item.classe,
    valor: Number(item.percentual.toFixed(2)),
    fill: CORES[i % CORES.length],
  }));

  const chartConfig = alocacao.reduce<ChartConfig>((acc, item) => {
    acc[item.classe] = { label: item.classe };
    return acc;
  }, {});

  return (
    <Card data-testid="allocation-chart">
      <CardHeader>
        <CardTitle>Alocação Atual</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">Sem dados de alocação.</p>
        ) : (
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[280px]">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="classe" hideLabel />} />
              <Pie
                data={chartData}
                dataKey="valor"
                nameKey="classe"
                innerRadius={60}
                strokeWidth={2}
              />
            </PieChart>
          </ChartContainer>
        )}
        <ul className="mt-4 space-y-1">
          {alocacao.map((item) => (
            <li key={item.classe} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-[2px]"
                  style={{ backgroundColor: CORES[alocacao.indexOf(item) % CORES.length] }}
                  aria-hidden="true"
                />
                {item.classe}
              </span>
              <span className="tabular-nums">
                {item.percentual.toFixed(1)}% ·{" "}
                {item.valor.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
