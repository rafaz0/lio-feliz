interface PremiumBadgeProps {
  size?: "sm" | "md";
}

export function PremiumBadge({ size = "sm" }: PremiumBadgeProps) {
  const sizeClass =
    size === "sm" ? "px-1 py-0.5 text-[9px] leading-3" : "px-2 py-0.5 text-[10px] leading-4";

  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-md bg-amber-100 font-semibold tracking-wide text-amber-800 dark:bg-amber-900/35 dark:text-amber-300 ${sizeClass}`}
    >
      {size === "md" && (
        <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      )}
      Premium
    </span>
  );
}
