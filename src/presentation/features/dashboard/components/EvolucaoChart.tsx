import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { TimeRangeSelector } from "@/presentation/shared/components/ui";
import type { TimeRangeId } from "@/presentation/shared/components/ui";
import type { EvolucaoPontoViewModel } from "../types/dashboard.view-model";

interface EvolucaoChartProps {
  evolucao: EvolucaoPontoViewModel[];
  selectedRange: TimeRangeId;
  onRangeChange: (id: TimeRangeId) => void;
}

const chartConfig = {
  patrimonioTotal: { label: "Patrimônio" },
  patrimonioInvestido: { label: "Investido" },
} satisfies ChartConfig;

export function EvolucaoChart({ evolucao, selectedRange, onRangeChange }: EvolucaoChartProps) {
  return (
    <Card data-testid="evolucao-chart">
      <CardHeader className="flex-row items-center justify-between">
        <div className="text-sm font-semibold">Evolução Patrimonial</div>
        <TimeRangeSelector selected={selectedRange} onSelect={onRangeChange} />
      </CardHeader>
      <CardContent>
        {evolucao.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">Sem dados de evolução.</p>
        ) : (
          <ChartContainer config={chartConfig} className="aspect-video max-h-[300px]">
            <AreaChart data={evolucao} margin={{ left: 8, right: 8, top: 8 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="data" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} width={48} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                dataKey="patrimonioTotal"
                type="monotone"
                fill="var(--chart-1)"
                stroke="var(--chart-1)"
                fillOpacity={0.3}
              />
              <Area
                dataKey="patrimonioInvestido"
                type="monotone"
                fill="var(--chart-2)"
                stroke="var(--chart-2)"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
