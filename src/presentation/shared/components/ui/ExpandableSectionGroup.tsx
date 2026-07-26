import { useState, type ReactNode } from "react";
import { cn } from "@/presentation/shared/utils/cn";
import { ExpandableSection } from "./ExpandableSection";

export interface ExpandableSectionGroupProps {
  mode?: "multiple" | "accordion";
  defaultOpenIndex?: number;
  children: ReactNode;
  className?: string;
}

interface SectionConfig {
  title: string;
  subtitle?: string;
  count?: number;
  icon?: ReactNode;
  content: ReactNode;
}

export function ExpandableSectionGroup({
  mode = "multiple",
  defaultOpenIndex,
  children,
  className,
}: ExpandableSectionGroupProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex ?? null);

  const configs = Array.isArray(children) ? children : [children];

  const handleToggle = (index: number) => {
    if (mode === "accordion") {
      setOpenIndex(openIndex === index ? null : index);
    }
  };

  return (
    <div className={cn("rounded-xl border bg-card", className)} data-testid="expandable-group">
      {configs.map((child, index) => {
        if (!child || typeof child !== "object" || !("props" in (child as any))) {
          return child;
        }
        const el = child as any;
        const isOpen = mode === "accordion" ? openIndex === index : (el.props.defaultOpen ?? false);

        return (
          <ExpandableSection
            key={index}
            title={el.props.title}
            subtitle={el.props.subtitle}
            count={el.props.count}
            icon={el.props.icon}
            defaultOpen={isOpen}
            className="border-0"
            onToggle={() => handleToggle(index)}
          >
            {el.props.children}
          </ExpandableSection>
        );
      })}
    </div>
  );
}
