import { describe, it, expect } from "vitest";
import { Asset, AssetId, Ticker } from "@/core/domain";

const VALID_UUID = "018f3a6d-9b3a-7c4e-9a1b-2c3d4e5f6789";

function makeAsset(
  overrides?: Partial<{
    id: AssetId;
    ticker: Ticker;
    name: string;
    assetType: string;
    isActive: boolean;
  }>,
): Asset {
  return new Asset(
    overrides?.id ?? AssetId.create(VALID_UUID),
    overrides?.ticker ?? Ticker.create("PETR4"),
    overrides?.name ?? "Petrobras PN",
    overrides?.assetType ?? "stock",
    overrides?.isActive ?? true,
  );
}

describe("Asset", () => {
  describe("creation", () => {
    it("creates an active asset with all required fields", () => {
      const asset = makeAsset();
      expect(asset.id.getValue()).toBe(VALID_UUID);
      expect(asset.ticker.getValue()).toBe("PETR4");
      expect(asset.name).toBe("Petrobras PN");
      expect(asset.assetType).toBe("stock");
      expect(asset.isActive).toBe(true);
    });

    it("creates an inactive asset when isActive is false", () => {
      const asset = makeAsset({ isActive: false });
      expect(asset.isActive).toBe(false);
    });

    it("creates with different asset types", () => {
      const asset = makeAsset({ assetType: "fii" });
      expect(asset.assetType).toBe("fii");
    });
  });

  describe("identity", () => {
    it("preserves identity after creation", () => {
      const id = AssetId.create(VALID_UUID);
      const asset = makeAsset({ id });
      expect(asset.id.equals(id)).toBe(true);
      expect(asset.id.getValue()).toBe(VALID_UUID);
    });

    it("equals by identity", () => {
      const id = AssetId.create(VALID_UUID);
      const a = makeAsset({ id, ticker: Ticker.create("PETR4"), name: "Petrobras" });
      const b = makeAsset({ id, ticker: Ticker.create("VALE3"), name: "Vale" });
      expect(a.equals(b)).toBe(true);
    });

    it("not equals for different ids", () => {
      const a = makeAsset({ id: AssetId.create(VALID_UUID) });
      const b = makeAsset({ id: AssetId.create("0190b4c2-5d6e-7f8a-9b0c-1d2e3f4a5b6c") });
      expect(a.equals(b)).toBe(false);
    });
  });

  describe("state changes", () => {
    it("activate() sets isActive to true", () => {
      const asset = makeAsset({ isActive: false });
      expect(asset.isActive).toBe(false);
      asset.activate();
      expect(asset.isActive).toBe(true);
    });

    it("deactivate() sets isActive to false", () => {
      const asset = makeAsset({ isActive: true });
      asset.deactivate();
      expect(asset.isActive).toBe(false);
    });

    it("activate() on active asset stays true", () => {
      const asset = makeAsset({ isActive: true });
      asset.activate();
      expect(asset.isActive).toBe(true);
    });

    it("deactivate() on inactive asset stays false", () => {
      const asset = makeAsset({ isActive: false });
      asset.deactivate();
      expect(asset.isActive).toBe(false);
    });
  });

  describe("identity stability", () => {
    it("altering state does not change identity", () => {
      const id = AssetId.create(VALID_UUID);
      const asset = makeAsset({ id });
      asset.deactivate();
      expect(asset.id.getValue()).toBe(VALID_UUID);
    });
  });

  describe("domain events infrastructure", () => {
    it("starts with no pending events", () => {
      const asset = makeAsset();
      expect(asset.getDomainEvents()).toEqual([]);
    });

    it("state changes do not emit events", () => {
      const asset = makeAsset();
      asset.activate();
      asset.deactivate();
      expect(asset.getDomainEvents()).toEqual([]);
    });
  });
});
