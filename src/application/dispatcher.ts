import type { ApplicationError } from "./errors/application-error";

export interface IDispatcher {
  Dispatch<TCommand, TDto>(command: TCommand): Promise<TDto | ApplicationError>;
  Register<TCommand, TDto>(
    commandType: new (...args: never[]) => TCommand,
    handler: (command: TCommand) => Promise<TDto | ApplicationError>,
  ): void;
}
