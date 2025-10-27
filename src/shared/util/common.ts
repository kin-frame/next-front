import dayjs from "dayjs";

export function formatDate(value: string, format = "YYYY.MM.DD") {
  if (!value) return "-";

  return dayjs(value).format(format);
}
