"use client";
import { Grid, Stack } from "@mui/material";

import FileUploadButton from "@/app/_components/FileUploadButton";
import CreateDirectoryButton from "./CreateDirectoryButton";
import DeleteDirectoryButton from "./DeleteDirectoryButton";
import ToggleListType from "./ToggleListType";

export default function PageHeader() {
  return (
    <Grid size={12}>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <FileUploadButton />
        <DeleteDirectoryButton />
        <CreateDirectoryButton />
        <ToggleListType />
      </Stack>
    </Grid>
  );
}
