"use client";
import Link from "next/link";
import { Button, Stack } from "@mui/material";

export default function PageFooter() {
  return (
    <Stack
      sx={{
        flexDirection: "row",
      }}
    >
      <Button component={Link} href={"/admin"} size="small" variant="outlined">
        뒤로가기
      </Button>
    </Stack>
  );
}
