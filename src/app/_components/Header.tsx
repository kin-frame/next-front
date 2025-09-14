"use client";
import { Stack, Typography } from "@mui/material";

import theme from "@/shared/mui/theme";

export default function Header() {
  return (
    <Stack
      sx={{
        mx: "auto",

        [theme.breakpoints.up("lg")]: {
          maxWidth: "1200px",
          height: "80px",
        },
        [theme.breakpoints.down("lg")]: {
          mx: "16px",
          height: "40px",
        },
      }}
    >
      <Typography color="primary.500">Header</Typography>
    </Stack>
  );
}
