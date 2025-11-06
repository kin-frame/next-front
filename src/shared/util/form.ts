import { RegisterOptions } from "react-hook-form";

import { formatNumber } from "./common";

export const registerNumberMask: Pick<
  RegisterOptions,
  "setValueAs" | "onChange"
> = {
  setValueAs: (value) => Number(String(value).replaceAll(",", "")),
  onChange: (event) => {
    event.target.value = formatNumber(event.target.value.replaceAll(",", ""));
  },
};
