const PRECISION = 5;

export default function getConversionResult(amount, exchangeRate) {
  return (amount * exchangeRate).toFixed(PRECISION);
}
