import type { ApplicationError } from "./errors/application-error";

export interface IApplicationService<TCommand, TDto> {
  Execute(command: TCommand): Promise<TDto | ApplicationError>;
}
