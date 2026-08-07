import { describe, it, expect } from "vitest";
import { isValidCpf, isValidCnpj, isValidCpfCnpj, formatCpfCnpj, onlyDigits } from "../cpf-cnpj";

describe("cpf-cnpj", () => {
  describe("isValidCpf", () => {
    it("aceita CPF valido, formatado ou nao", () => {
      expect(isValidCpf("111.444.777-35")).toBe(true);
      expect(isValidCpf("11144477735")).toBe(true);
    });

    it("rejeita CPF com digito verificador errado", () => {
      expect(isValidCpf("111.444.777-36")).toBe(false);
    });

    it("rejeita sequencia de digitos repetidos", () => {
      expect(isValidCpf("111.111.111-11")).toBe(false);
    });

    it("rejeita tamanho errado", () => {
      expect(isValidCpf("123456")).toBe(false);
    });
  });

  describe("isValidCnpj", () => {
    it("aceita CNPJ valido, formatado ou nao", () => {
      expect(isValidCnpj("11.222.333/0001-81")).toBe(true);
      expect(isValidCnpj("11222333000181")).toBe(true);
    });

    it("rejeita CNPJ com digito verificador errado", () => {
      expect(isValidCnpj("11.222.333/0001-82")).toBe(false);
    });

    it("rejeita sequencia de digitos repetidos", () => {
      expect(isValidCnpj("11.111.111/1111-11")).toBe(false);
    });
  });

  describe("isValidCpfCnpj", () => {
    it("detecta CPF pelo tamanho", () => {
      expect(isValidCpfCnpj("111.444.777-35")).toBe(true);
    });

    it("detecta CNPJ pelo tamanho", () => {
      expect(isValidCpfCnpj("11.222.333/0001-81")).toBe(true);
    });

    it("rejeita tamanho que nao e nem CPF nem CNPJ", () => {
      expect(isValidCpfCnpj("123")).toBe(false);
    });
  });

  describe("formatCpfCnpj", () => {
    it("formata CPF completo", () => {
      expect(formatCpfCnpj("11144477735")).toBe("111.444.777-35");
    });

    it("formata CNPJ completo", () => {
      expect(formatCpfCnpj("11222333000181")).toBe("11.222.333/0001-81");
    });

    it("formata parcialmente enquanto o usuario ainda esta digitando", () => {
      expect(formatCpfCnpj("111444")).toBe("111.444");
    });
  });

  describe("onlyDigits", () => {
    it("remove tudo que nao e digito", () => {
      expect(onlyDigits("111.444.777-35")).toBe("11144477735");
    });
  });
});
