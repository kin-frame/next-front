"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Grid, LinearProgress, Stack, Typography } from "@mui/material";

import { API_URL } from "@/shared/api";

export default function PageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    window.location.href = `${API_URL}/auth/token?sessionId=${sessionId}`;
  }, [sessionId]);

  return (
    <Grid size={12}>
      <Stack sx={{ gap: "24px" }}>
        <LinearProgress variant="indeterminate" />
        <Typography sx={{ textAlign: "center" }}>
          {`인증을 진행하는 중입니다.`}
          <br />
          {`잠시만 기다려주세요.`}
        </Typography>
      </Stack>
    </Grid>
  );
}
