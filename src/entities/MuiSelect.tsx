"use client";

import { useId } from "react";
import {
  FormControl,
  InputLabel,
  NativeSelect,
  NativeSelectProps,
} from "@mui/material";

type MuiSelectProps = {
  label?: string;
} & NativeSelectProps;

export default function MuiSelect({
  sx,
  fullWidth,
  label,
  ...selectProps
}: MuiSelectProps) {
  const uuid = useId();
  const inputId = (selectProps.id || selectProps.name) + uuid;

  return (
    <FormControl sx={sx} fullWidth={fullWidth}>
      <InputLabel variant="standard" htmlFor={inputId}>
        {label}
      </InputLabel>
      <NativeSelect
        {...selectProps}
        inputProps={{
          id: inputId,
        }}
      />
    </FormControl>
  );
}
