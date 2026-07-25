import { Sparkles } from "lucide-react";

export function DemoBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-500">
      <Sparkles className="size-2.5" />
      Demo
    </span>
  );
}
