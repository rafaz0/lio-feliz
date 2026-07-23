import type { IImportHistoryRepository } from "@/application/ports/import-history-repository";
import { ImportJob } from "@/core/domain/import-export";

export class FakeImportHistoryRepository implements IImportHistoryRepository {
  private jobs: Map<string, ImportJob> = new Map();

  async save(job: ImportJob): Promise<void> {
    this.jobs.set(job.id.value, job);
  }

  async findById(jobId: string): Promise<ImportJob | null> {
    return this.jobs.get(jobId) || null;
  }

  async findAll(): Promise<ImportJob[]> {
    return Array.from(this.jobs.values());
  }

  async update(job: ImportJob): Promise<void> {
    if (this.jobs.has(job.id.value)) {
      this.jobs.set(job.id.value, job);
    }
  }

  async delete(jobId: string): Promise<void> {
    this.jobs.delete(jobId);
  }

  async findByStatus(status: string): Promise<ImportJob[]> {
    return Array.from(this.jobs.values()).filter((job) => job.status === status);
  }

  async findByUserId(userId: string): Promise<ImportJob[]> {
    return Array.from(this.jobs.values()).filter((job) => job.metadata?.usuarioId === userId);
  }
}
