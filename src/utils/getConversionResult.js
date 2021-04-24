const PRECISION = 5;

export function getConversionResult(amount, exchangeRate) {
  return (amount * exchangeRate).toFixed(PRECISION);
}
