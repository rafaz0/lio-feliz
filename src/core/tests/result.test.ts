import { describe, it, expect } from "vitest";
import { Result, DomainError } from "@/core/domain";

describe("Result", () => {
  describe("ok", () => {
    it("creates a successful Result", () => {
      const result = Result.ok(42);
      expect(result.isSuccess).toBe(true);
      expect(result.isFailure).toBe(false);
    });

    it("stores the value", () => {
      const result = Result.ok("hello");
      expect(result.value).toBe("hello");
    });

    it("has undefined error on success", () => {
      const result = Result.ok(42);
      expect(result.error).toBeUndefined();
    });
  });

  describe("fail", () => {
    it("creates a failed Result", () => {
      const error = new DomainError("ERR_001", "Something went wrong");
      const result = Result.fail(error);
      expect(result.isSuccess).toBe(false);
      expect(result.isFailure).toBe(true);
    });

    it("stores the error", () => {
      const error = new DomainError("ERR_001", "Something went wrong");
      const result = Result.fail(error);
      expect(result.error).toBe(error);
    });

    it("has undefined value on failure", () => {
      const error = new DomainError("ERR_001", "Something went wrong");
      const result = Result.fail(error);
      expect(result.value).toBeUndefined();
    });
  });

  describe("map", () => {
    it("transforms a success value", () => {
      const result = Result.ok(10);
      const mapped = result.map((x) => x * 2);
      expect(mapped.value).toBe(20);
      expect(mapped.isSuccess).toBe(true);
    });

    it("does not transform a failure", () => {
      const error = new DomainError("ERR_001", "fail");
      const result = Result.fail<number>(error);
      const mapped = result.map((x) => x * 2);
      expect(mapped.isFailure).toBe(true);
      expect(mapped.error).toBe(error);
    });

    it("preserves the error type through map", () => {
      const result = Result.ok("hello");
      const mapped = result.map((s) => s.length);
      const _typeCheck: Result<number> = mapped;
      expect(_typeCheck.value).toBe(5);
    });
  });

  describe("flatMap", () => {
    it("chains successful operations", () => {
      const result = Result.ok(5);
      const chained = result.flatMap((x) => Result.ok(x + 3));
      expect(chained.value).toBe(8);
      expect(chained.isSuccess).toBe(true);
    });

    it("short-circuits on failure", () => {
      const error = new DomainError("ERR_001", "fail");
      const result = Result.ok(5);
      const chained = result.flatMap(() => Result.fail<number>(error));
      expect(chained.isFailure).toBe(true);
      expect(chained.error).toBe(error);
    });

    it("does not execute on a failed result", () => {
      const error = new DomainError("ERR_001", "initial fail");
      const result = Result.fail<number>(error);
      let executed = false;
      const chained = result.flatMap((x) => {
        executed = true;
        return Result.ok(x + 1);
      });
      expect(executed).toBe(false);
      expect(chained.isFailure).toBe(true);
      expect(chained.error).toBe(error);
    });
  });

  describe("match", () => {
    it("calls success handler on ok", () => {
      const result = Result.ok(42);
      const output = result.match({
        success: (v) => `value: ${v}`,
        failure: () => "error",
      });
      expect(output).toBe("value: 42");
    });

    it("calls failure handler on fail", () => {
      const error = new DomainError("ERR_001", "fail");
      const result = Result.fail<number>(error);
      const output = result.match({
        success: (v) => `value: ${v}`,
        failure: (e) => `error: ${e.code}`,
      });
      expect(output).toBe("error: ERR_001");
    });

    it("returns the correct type from match", () => {
      const result = Result.ok(10);
      const output: string = result.match({
        success: (v) => v.toString(),
        failure: () => "fail",
      });
      expect(output).toBe("10");
    });
  });

  describe("combine", () => {
    it("combines all successful results", () => {
      const r1 = Result.ok(1);
      const r2 = Result.ok(2);
      const r3 = Result.ok(3);
      const combined = Result.combine([r1, r2, r3]);
      expect(combined.isSuccess).toBe(true);
      expect(combined.value).toEqual([1, 2, 3]);
    });

    it("returns first failure", () => {
      const error1 = new DomainError("ERR_001", "first error");
      const error2 = new DomainError("ERR_002", "second error");
      const r1 = Result.ok(1);
      const r2 = Result.fail<number>(error1);
      const r3 = Result.fail<number>(error2);
      const combined = Result.combine([r1, r2, r3]);
      expect(combined.isFailure).toBe(true);
      expect(combined.error).toBe(error1);
    });

    it("combines empty array", () => {
      const combined = Result.combine([]);
      expect(combined.isSuccess).toBe(true);
      expect(combined.value).toEqual([]);
    });
  });

  describe("immutability", () => {
    it("does not allow modifying isSuccess", () => {
      const result = Result.ok(42);
      expect(() => {
        (result as { isSuccess: boolean }).isSuccess = false;
      }).toThrow();
    });

    it("does not allow modifying value", () => {
      const result = Result.ok(42);
      expect(() => {
        (result as { value: number }).value = 99;
      }).toThrow();
    });
  });

  describe("type safety", () => {
    it("infers success type from ok", () => {
      const result = Result.ok("hello");
      const _check: Result<string> = result;
      expect(_check.value).toBe("hello");
    });

    it("infers error type from fail", () => {
      const error = new DomainError("ERR", "msg");
      const result = Result.fail(error);
      const _check: Result<never, DomainError> = result;
      expect(_check.error).toBe(error);
    });

    it("allows custom error types", () => {
      class MyError {
        constructor(public readonly code: string) {}
      }
      const result = Result.fail<number, MyError>(new MyError("CUSTOM"));
      expect(result.isFailure).toBe(true);
      expect(result.error!.code).toBe("CUSTOM");
    });
  });
});

describe("DomainError", () => {
  it("creates an error with code and message", () => {
    const err = new DomainError("ERR_001", "Test error");
    expect(err.code).toBe("ERR_001");
    expect(err.message).toBe("Test error");
    expect(err.type).toBe("DOMAIN_ERROR");
  });

  it("allows custom type", () => {
    const err = new DomainError("ERR_002", "Validation error", "VALIDATION_ERROR");
    expect(err.type).toBe("VALIDATION_ERROR");
  });

  it("is immutable", () => {
    const err = new DomainError("ERR_001", "Test");
    expect(() => {
      (err as { code: string }).code = "CHANGED";
    }).toThrow();
    expect(() => {
      (err as { message: string }).message = "changed";
    }).toThrow();
    expect(() => {
      (err as { type: string }).type = "changed";
    }).toThrow();
  });

  it("equals compares by value", () => {
    const err1 = new DomainError("ERR_001", "Test", "DOMAIN_ERROR");
    const err2 = new DomainError("ERR_001", "Test", "DOMAIN_ERROR");
    expect(err1.equals(err2)).toBe(true);
  });

  it("equals returns false for different codes", () => {
    const err1 = new DomainError("ERR_001", "Test");
    const err2 = new DomainError("ERR_002", "Test");
    expect(err1.equals(err2)).toBe(false);
  });

  it("equals returns false for different messages", () => {
    const err1 = new DomainError("ERR_001", "First");
    const err2 = new DomainError("ERR_001", "Second");
    expect(err1.equals(err2)).toBe(false);
  });

  it("equals returns false for different types", () => {
    const err1 = new DomainError("ERR_001", "Test", "TYPE_A");
    const err2 = new DomainError("ERR_001", "Test", "TYPE_B");
    expect(err1.equals(err2)).toBe(false);
  });
});
