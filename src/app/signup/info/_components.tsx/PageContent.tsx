"use client";
import Link from "next/link";
import { Button, Grid, Stack, Typography } from "@mui/material";

export default function PageContent() {
  return (
    <Grid size={12}>
      <Stack
        sx={{
          gap: "12px",
        }}
      >
        <Typography variant="h1" fontWeight={700} fontSize={25}>
          회원가입 신청 완료
        </Typography>
        <Typography>회원가입 신청을 완료했습니다.</Typography>
        <Typography>관리자의 승인 이후 사용할 수 있습니다.</Typography>
        <Button LinkComponent={Link} href="/login">
          로그인화면으로 이동
        </Button>
      </Stack>
    </Grid>
  );
}
