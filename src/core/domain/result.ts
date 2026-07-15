import type { DomainError } from "./errors";

export class Result<T, E = DomainError> {
  private constructor(
    private readonly _isSuccess: boolean,
    private readonly _value?: T,
    private readonly _error?: E,
  ) {}

  static ok<T, E = never>(value: T): Result<T, E> {
    return new Result<T, E>(true, value, undefined);
  }

  static fail<T = never, E = DomainError>(error: E): Result<T, E> {
    return new Result<T, E>(false, undefined, error);
  }

  get isSuccess(): boolean {
    return this._isSuccess;
  }

  get isFailure(): boolean {
    return !this._isSuccess;
  }

  get value(): T | undefined {
    return this._value;
  }

  get error(): E | undefined {
    return this._error;
  }

  map<U>(fn: (value: T) => U): Result<U, E> {
    if (this._isSuccess) {
      return Result.ok(fn(this._value as T));
    }
    return this as unknown as Result<U, E>;
  }

  flatMap<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
    if (this._isSuccess) {
      return fn(this._value as T);
    }
    return this as unknown as Result<U, E>;
  }

  match<U>(handlers: { success: (value: T) => U; failure: (error: E) => U }): U {
    if (this._isSuccess) {
      return handlers.success(this._value as T);
    }
    return handlers.failure(this._error as E);
  }

  static combine<T, E>(results: Result<T, E>[]): Result<T[], E> {
    const values: T[] = [];
    for (const result of results) {
      if (result._isSuccess) {
        values.push(result._value as T);
      } else {
        return result as unknown as Result<T[], E>;
      }
    }
    return Result.ok(values);
  }
}
