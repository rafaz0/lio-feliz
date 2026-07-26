interface PremiumBadgeProps {
  size?: "sm" | "md";
}

export function PremiumBadge({ size = "sm" }: PremiumBadgeProps) {
  const sizeClass = size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-amber-100 font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 ${sizeClass}`}
    >
      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      Premium
    </span>
  );
}
