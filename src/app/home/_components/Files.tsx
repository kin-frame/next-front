"use client";
import Link from "next/link";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { Button, Grid, Stack } from "@mui/material";

export default function Files() {
  return (
    <Grid size={12}>
      <Stack>
        <Button
          startIcon={<FolderOutlinedIcon />}
          variant="text"
          color="inherit"
          LinkComponent={Link}
          href="/file"
        >
          내 파일 확인하기
        </Button>
      </Stack>
    </Grid>
  );
}
