import type { ApplicationError } from "./errors/application-error";
import type { ICommand, IQuery, CommandHandler, QueryHandler } from "./types";

export interface IDispatcher {
  DispatchCommand<TDto>(command: ICommand): Promise<TDto | ApplicationError>;
  DispatchQuery<TDto>(query: IQuery): Promise<TDto | ApplicationError>;
  RegisterCommand(commandType: string, handler: CommandHandler<unknown>): void;
  RegisterQuery(queryType: string, handler: QueryHandler<unknown>): void;
}
