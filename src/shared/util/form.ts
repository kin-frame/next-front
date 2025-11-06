export function parseMaskedValue(value?: number | string) {
  return Number(String(value).replaceAll(",", ""));
}
