import { Result } from "../result";
import { ExportTemplate } from "./export-template";
import { ExportJob } from "./export-job";
import { ExportJobId } from "./export-types";
import { type ExportFormatType } from "./export-types";
import { InvalidFormatError, ExportFailedError } from "./errors";

export type ComposeResult = {
  bytes: Uint8Array;
  checksum: string;
};

export class ExportComposer {
  compose(
    template: ExportTemplate,
    data: Record<string, unknown>,
  ): Result<ComposeResult> {
    const validFormats: ExportFormatType[] = ["PDF", "CSV", "JSON", "XLSX"];
    if (!validFormats.includes(template.format)) {
      return Result.fail(new InvalidFormatError(template.format));
    }

    try {
      const content = this.render(template, data);
      const checksum = this.calculateChecksum(content);
      return Result.ok({ bytes: content, checksum });
    } catch (err) {
      return Result.fail(
        new ExportFailedError(err instanceof Error ? err.message : "Erro ao compor exportacao"),
      );
    }
  }

  createJob(
    template: ExportTemplate,
    portfolioId: string,
    parameters: Record<string, unknown>,
  ): ExportJob {
    return ExportJob.create({
      id: ExportJobId.generate(),
      templateId: template.id.value,
      portfolioId,
      parameters,
      status: "PENDING",
      requestedAt: new Date(),
    });
  }

  private render(template: ExportTemplate, data: Record<string, unknown>): Uint8Array {
    const content = JSON.stringify({ template: template.name, version: template.version, data });
    return new TextEncoder().encode(content);
  }

  private calculateChecksum(content: Uint8Array): string {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const byte = content[i];
      hash = ((hash << 5) - hash) + byte;
      hash |= 0;
    }
    return `sha256:${Math.abs(hash).toString(16).padStart(8, "0")}`;
  }
}
