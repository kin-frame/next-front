"use client";
import { Grid, Stack } from "@mui/material";

import CreateDirectoryButton from "./CreateDirectoryButton";
import ToggleListType from "./ToggleListType";

export default function PageHeader() {
  return (
    <Grid size={12}>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <CreateDirectoryButton />
        <ToggleListType />
      </Stack>
    </Grid>
  );
}
