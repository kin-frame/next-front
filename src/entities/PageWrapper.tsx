"use client";
import { Grid, StackProps } from "@mui/material";

import theme from "@/shared/mui/theme";

export default function PageWrapper({ children }: StackProps) {
  return (
    <Grid
      container
      spacing={{
        xs: 1,
        xl: 2,
      }}
      columns={{
        xs: 4,
        sm: 4,
        md: 8,
        lg: 12,
        xl: 12,
      }}
      sx={{
        mx: "auto",
        alignItems: "flex-start",
        alignContent: "flex-start",

        [theme.breakpoints.up("lg")]: {
          width: "100%",
          maxWidth: "1200px",
          pt: "40px",
        },
        [theme.breakpoints.down("lg")]: {
          mx: "16px",
          pt: "24px",
          minHeight: "70vh",
        },
      }}
    >
      {children}
    </Grid>
  );
}
