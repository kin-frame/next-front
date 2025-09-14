"use client";
import { Box, Stack, Typography } from "@mui/material";

import theme from "@/shared/mui/theme";

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "primary.50",

        mt: "40px",
        [theme.breakpoints.down("lg")]: {
          mt: "24px",
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          py: "40px",
          [theme.breakpoints.down("lg")]: {
            mx: "16px",
            py: "24px",
          },
        }}
      >
        <Typography sx={{ color: "gray.900" }}>@KinFrames</Typography>
      </Stack>
    </Box>
  );
}
