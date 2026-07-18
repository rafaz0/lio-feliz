import type { ApplicationError } from "./errors/application-error";

export interface ICommand {
  readonly type: string;
}

export interface IQuery {
  readonly type: string;
}

export type CommandHandler<TDto> = (command: ICommand) => Promise<TDto | ApplicationError>;

export type QueryHandler<TDto> = (query: IQuery) => Promise<TDto | ApplicationError>;
