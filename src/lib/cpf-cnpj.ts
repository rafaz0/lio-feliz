// Validação e formatação de CPF/CNPJ — exigido pelo Asaas pra criar um
// cliente (ver src/infrastructure/gateways/asaas-payment-gateway.ts).
// Algoritmo de dígito verificador padrão da Receita Federal.

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

function hasAllSameDigits(digits: string): boolean {
  return digits.split("").every((d) => d === digits[0]);
}

export function isValidCpf(value: string): boolean {
  const digits = onlyDigits(value);
  if (digits.length !== 11 || hasAllSameDigits(digits)) return false;

  const calcCheckDigit = (base: string, weightStart: number): number => {
    let sum = 0;
    for (let i = 0; i < base.length; i++) {
      sum += Number(base[i]) * (weightStart - i);
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const d1 = calcCheckDigit(digits.slice(0, 9), 10);
  const d2 = calcCheckDigit(digits.slice(0, 10), 11);

  return d1 === Number(digits[9]) && d2 === Number(digits[10]);
}

export function isValidCnpj(value: string): boolean {
  const digits = onlyDigits(value);
  if (digits.length !== 14 || hasAllSameDigits(digits)) return false;

  const calcCheckDigit = (base: string, weights: number[]): number => {
    let sum = 0;
    for (let i = 0; i < base.length; i++) {
      sum += Number(base[i]) * weights[i];
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const d1 = calcCheckDigit(digits.slice(0, 12), w1);
  const d2 = calcCheckDigit(digits.slice(0, 13), w2);

  return d1 === Number(digits[12]) && d2 === Number(digits[13]);
}

export function isValidCpfCnpj(value: string): boolean {
  const digits = onlyDigits(value);
  if (digits.length === 11) return isValidCpf(digits);
  if (digits.length === 14) return isValidCnpj(digits);
  return false;
}

export function formatCpfCnpj(value: string): string {
  const digits = onlyDigits(value).slice(0, 14);
  if (digits.length <= 11) {
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return digits
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}
