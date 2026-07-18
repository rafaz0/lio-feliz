import { ApplicationError, NotFoundError, InternalError } from "./errors/application-error";
import type { ICommand, IQuery, CommandHandler, QueryHandler } from "./types";
import type { IDispatcher } from "./dispatcher";
import type { IUnitOfWork } from "./ports/unit-of-work";
import { Validator } from "./validator";
import { convertUnexpectedError } from "./error-converter";

type HandlerEntry = {
  handler: CommandHandler<unknown> | QueryHandler<unknown>;
  isCommand: boolean;
};

export class DispatcherImpl implements IDispatcher {
  private readonly registry = new Map<string, HandlerEntry>();
  private readonly validator: Validator;
  private readonly uow: IUnitOfWork | null;

  constructor(unitOfWork?: IUnitOfWork | null, validator?: Validator) {
    this.uow = unitOfWork ?? null;
    this.validator = validator ?? new Validator();
  }

  RegisterCommand(commandType: string, handler: CommandHandler<unknown>): void {
    this.registry.set(commandType, { handler, isCommand: true });
  }

  RegisterQuery(queryType: string, handler: QueryHandler<unknown>): void {
    this.registry.set(queryType, { handler, isCommand: false });
  }

  async DispatchCommand<TDto>(command: ICommand): Promise<TDto | ApplicationError> {
    return this.route<ICommand, TDto>(command, true);
  }

  async DispatchQuery<TDto>(query: IQuery): Promise<TDto | ApplicationError> {
    return this.route<IQuery, TDto>(query, false);
  }

  private async route<TInput extends { type: string }, TDto>(
    input: TInput,
    isCommand: boolean,
  ): Promise<TDto | ApplicationError> {
    try {
      const entry = this.registry.get(input.type);
      if (!entry) {
        return new NotFoundError(
          isCommand ? "Command" : "Query",
          input.type,
          "HANDLER_NOT_FOUND",
          `Nenhum handler registrado para ${input.type}`,
        );
      }

      if (isCommand !== entry.isCommand) {
        const actual = entry.isCommand ? "Command" : "Query";
        const expected = isCommand ? "Command" : "Query";
        return new InternalError(
          "INVALID_REGISTRATION",
          `Tipo '${input.type}' registrado como ${actual}, mas invocado como ${expected}`,
        );
      }

      if (isCommand && this.uow) {
        return await this.executeWithUow<TDto>(entry, input as ICommand);
      }

      const result = await (entry.handler as (input: ICommand) => Promise<TDto | ApplicationError>)(
        input as ICommand,
      );
      return result;
    } catch (error) {
      return convertUnexpectedError(error);
    }
  }

  private async executeWithUow<TDto>(
    entry: HandlerEntry,
    input: ICommand,
  ): Promise<TDto | ApplicationError> {
    try {
      await this.uow!.IniciarTransacao();
      const handler = entry.handler as (input: ICommand) => Promise<TDto | ApplicationError>;
      const result = await handler(input);
      if (result instanceof ApplicationError) {
        await this.uow!.Rollback();
        return result;
      }
      await this.uow!.Commit();
      return result;
    } catch (error) {
      try {
        await this.uow!.Rollback();
      } catch {
        // Rollback failure is non-fatal at this point
      }
      return convertUnexpectedError(error);
    }
  }
}
