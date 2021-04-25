import { PRECISION } from "@/constants";

export function getConversionResult(amount, exchangeRate) {
  return (amount * exchangeRate).toFixed(PRECISION);
}
