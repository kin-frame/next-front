import dayjs from "dayjs";

export function formatDate(value = "", format = "YYYY.MM.DD") {
  if (!value) return "-";

  return dayjs(value).format(format);
}

export function formatNumber(value = 0) {
  if (isNaN(value)) return "";

  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function parseJSON<T = object>(value = ""): T | null {
  try {
    const result: T = JSON.parse(value);
    return result;
  } catch {
    return null;
  }
}
