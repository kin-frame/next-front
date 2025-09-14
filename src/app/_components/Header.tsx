"use client";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { IconButton, Stack } from "@mui/material";

import theme from "@/shared/mui/theme";

export default function Header() {
  return (
    <Stack
      sx={{
        mx: "auto",

        maxWidth: "1200px",
        height: "80px",
        mb: "40px",
        [theme.breakpoints.down("lg")]: {
          mx: "16px",
          height: "40px",
          mb: "24px",
        },
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <IconButton>
        <MenuOutlinedIcon />
      </IconButton>
    </Stack>
  );
}
