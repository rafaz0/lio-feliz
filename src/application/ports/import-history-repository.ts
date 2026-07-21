import type { ImportJob } from "@/core/domain/import-export/import-job";

export interface IImportHistoryRepository {
  save(job: ImportJob): Promise<void>;
  findById(jobId: string): Promise<ImportJob | null>;
  findAll(): Promise<ImportJob[]>;
  update(job: ImportJob): Promise<void>;
  delete(jobId: string): Promise<void>;
  findByStatus(status: string): Promise<ImportJob[]>;
  findByUserId(userId: string): Promise<ImportJob[]>;
}
