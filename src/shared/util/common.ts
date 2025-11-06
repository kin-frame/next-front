import dayjs from "dayjs";

export function formatDate(value = "", format = "YYYY.MM.DD") {
  if (!value) return "-";

  return dayjs(value).format(format);
}

export function formatNumber(value = 0) {
  if (isNaN(value)) return "";

  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
