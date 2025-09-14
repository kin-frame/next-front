"use client";
import { Grid, StackProps } from "@mui/material";

import theme from "@/shared/mui/theme";

interface PageWrapperProps extends StackProps {
  showGuide?: boolean;
}

export default function PageWrapper({}: PageWrapperProps) {
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

        [theme.breakpoints.up("lg")]: {
          maxWidth: "1200px",
        },
        [theme.breakpoints.down("lg")]: {
          mx: "16px",
        },
      }}
    >
      <Grid size={4} height={100} sx={{ bgcolor: "primary.50" }}></Grid>
      <Grid size={4} height={100} sx={{ bgcolor: "primary.50" }}></Grid>
      <Grid size={4} height={100} sx={{ bgcolor: "primary.50" }}></Grid>
      <Grid size={4} height={100} sx={{ bgcolor: "primary.50" }}></Grid>
      <Grid size={4} height={100} sx={{ bgcolor: "primary.50" }}></Grid>
    </Grid>
  );
}
