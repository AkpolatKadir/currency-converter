export function getDateText(date = new Date()) {
  return date.toISOString().split("T")[0];
}
