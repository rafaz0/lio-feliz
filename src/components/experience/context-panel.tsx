import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface ContextPanelSection {
  title: string;
  content: ReactNode;
  icon?: ReactNode;
}

interface ContextPanelProps {
  title?: string;
  sections: ContextPanelSection[];
  className?: string;
}

export function ContextPanel({ title, sections, className }: ContextPanelProps) {
  if (sections.length === 0) return null;

  return (
    <Card className={cn("h-fit", className)}>
      {title && (
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-4">
        {sections.map((section) => (
          <div key={section.title}>
            <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {section.icon}
              {section.title}
            </div>
            <div className="text-sm">{section.content}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
