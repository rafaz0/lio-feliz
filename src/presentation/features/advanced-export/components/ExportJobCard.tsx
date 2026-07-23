import type { ExportJobViewModel } from "../viewmodels/exports.view-model";

interface ExportJobCardProps {
  job: ExportJobViewModel;
}

export function ExportJobCard({ job }: ExportJobCardProps) {
  const statusColor =
    job.status === "COMPLETED"
      ? "text-green-600"
      : job.status === "FAILED"
        ? "text-red-600"
        : "text-yellow-600";

  return (
    <div className="rounded-lg border px-4 py-3 text-sm">
      <div className="flex items-center justify-between">
        <span className="font-medium">{job.templateId}</span>
        <span className={`${statusColor} text-xs`}>{job.statusLabel}</span>
      </div>
      <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
        <span>{job.requestedAt}</span>
        {job.sizeBytes && <span>{(job.sizeBytes / 1024).toFixed(1)} KB</span>}
        {job.checksum && <span className="font-mono">{job.checksum.substring(0, 16)}...</span>}
      </div>
    </div>
  );
}
