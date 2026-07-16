import { describe, it, expect } from "vitest";
import { AssetId, PortfolioId, OperationId, InstitutionId } from "@/core/domain";

const VALID_UUIDV7 = "018f3a6d-9b3a-7c4e-9a1b-2c3d4e5f6789";
const VALID_UUIDV7_ALT = "0190b4c2-5d6e-7f8a-9b0c-1d2e3f4a5b6c";
const INVALID_UUID = "not-a-uuid";
const UUIDV4 = "550e8400-e29b-41d4-a716-446655440000";

describe("AssetId", () => {
  describe("creation", () => {
    it("creates with valid UUIDv7", () => {
      const id = AssetId.create(VALID_UUIDV7);
      expect(id.getValue()).toBe(VALID_UUIDV7);
    });
  });

  describe("validation", () => {
    it("accepts UUIDv7", () => {
      expect(AssetId.isValid(VALID_UUIDV7)).toBe(true);
    });

    it("rejects non-UUID strings", () => {
      expect(AssetId.isValid(INVALID_UUID)).toBe(false);
    });

    it("rejects UUIDv4", () => {
      expect(AssetId.isValid(UUIDV4)).toBe(false);
    });

    it("rejects non-string types", () => {
      expect(AssetId.isValid(123 as unknown as string)).toBe(false);
    });

    it("rejects empty string", () => {
      expect(AssetId.isValid("")).toBe(false);
    });
  });

  describe("equality", () => {
    it("equal ids are equal", () => {
      const a = AssetId.create(VALID_UUIDV7);
      const b = AssetId.create(VALID_UUIDV7);
      expect(a.equals(b)).toBe(true);
    });

    it("different ids are not equal", () => {
      const a = AssetId.create(VALID_UUIDV7);
      const b = AssetId.create(VALID_UUIDV7_ALT);
      expect(a.equals(b)).toBe(false);
    });
  });
});

describe("PortfolioId", () => {
  describe("creation", () => {
    it("creates with valid UUIDv7", () => {
      const id = PortfolioId.create(VALID_UUIDV7);
      expect(id.getValue()).toBe(VALID_UUIDV7);
    });
  });

  describe("validation", () => {
    it("accepts UUIDv7", () => {
      expect(PortfolioId.isValid(VALID_UUIDV7)).toBe(true);
    });

    it("rejects non-UUID strings", () => {
      expect(PortfolioId.isValid(INVALID_UUID)).toBe(false);
    });
  });

  describe("equality", () => {
    it("equal ids are equal", () => {
      const a = PortfolioId.create(VALID_UUIDV7);
      const b = PortfolioId.create(VALID_UUIDV7);
      expect(a.equals(b)).toBe(true);
    });

    it("different ids are not equal", () => {
      const a = PortfolioId.create(VALID_UUIDV7);
      const b = PortfolioId.create(VALID_UUIDV7_ALT);
      expect(a.equals(b)).toBe(false);
    });

    it("different identifier types are not equal", () => {
      const assetId = AssetId.create(VALID_UUIDV7);
      const portfolioId = PortfolioId.create(VALID_UUIDV7);
      expect(assetId.equals(portfolioId)).toBe(false);
    });
  });
});

describe("OperationId", () => {
  describe("creation", () => {
    it("creates with valid UUIDv7", () => {
      const id = OperationId.create(VALID_UUIDV7);
      expect(id.getValue()).toBe(VALID_UUIDV7);
    });
  });

  describe("validation", () => {
    it("accepts UUIDv7", () => {
      expect(OperationId.isValid(VALID_UUIDV7)).toBe(true);
    });

    it("rejects non-UUID strings", () => {
      expect(OperationId.isValid(INVALID_UUID)).toBe(false);
    });
  });

  describe("equality", () => {
    it("equal ids are equal", () => {
      const a = OperationId.create(VALID_UUIDV7);
      const b = OperationId.create(VALID_UUIDV7);
      expect(a.equals(b)).toBe(true);
    });

    it("different ids are not equal", () => {
      const a = OperationId.create(VALID_UUIDV7);
      const b = OperationId.create(VALID_UUIDV7_ALT);
      expect(a.equals(b)).toBe(false);
    });
  });
});

describe("InstitutionId", () => {
  describe("creation", () => {
    it("creates with valid UUIDv7", () => {
      const id = InstitutionId.create(VALID_UUIDV7);
      expect(id.getValue()).toBe(VALID_UUIDV7);
    });
  });

  describe("validation", () => {
    it("accepts UUIDv7", () => {
      expect(InstitutionId.isValid(VALID_UUIDV7)).toBe(true);
    });

    it("rejects non-UUID strings", () => {
      expect(InstitutionId.isValid(INVALID_UUID)).toBe(false);
    });
  });

  describe("equality", () => {
    it("equal ids are equal", () => {
      const a = InstitutionId.create(VALID_UUIDV7);
      const b = InstitutionId.create(VALID_UUIDV7);
      expect(a.equals(b)).toBe(true);
    });

    it("different ids are not equal", () => {
      const a = InstitutionId.create(VALID_UUIDV7);
      const b = InstitutionId.create(VALID_UUIDV7_ALT);
      expect(a.equals(b)).toBe(false);
    });
  });
});
