export function getSanitizedInputValue(value = "") {
  let result = value;
  if (result.length === 0) {
    return result;
  }

  result = value.replace(/[^0-9.,]/g, "").replace(",", ".");

  if (result.indexOf(".") >= 0) {
    const decimalPart = result.indexOf(".");
    const leftSide = result.substring(0, decimalPart);
    const rightSide = result.substring(decimalPart).substring(0, 3);
    result = `${leftSide}${rightSide}`;
  }

  return result;
}
