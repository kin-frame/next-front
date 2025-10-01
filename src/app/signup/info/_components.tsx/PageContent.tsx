"use client";
import { Button, Grid, Stack, Typography } from "@mui/material";

import { useLogoutMutation } from "@/services/auth/query";
import theme from "@/shared/mui/theme";

export default function PageContent() {
  const { mutate: logout } = useLogoutMutation();

  return (
    <Grid size={12}>
      <Stack
        sx={{
          gap: "40px",
          [theme.breakpoints.down("lg")]: {
            gap: "24px",
          },
        }}
      >
        <Stack
          sx={{
            gap: "16px",
            [theme.breakpoints.down("lg")]: {
              gap: "12px",
            },
          }}
        >
          <Typography variant="h1" fontWeight={700} fontSize={25}>
            ✅회원가입 신청 완료
          </Typography>
          <Typography>
            {`회원가입 신청을 완료했습니다.`}
            <br />
            {`관리자의 승인 이후 사용할 수 있습니다.`}
          </Typography>
        </Stack>
        <Button
          onClick={() => {
            logout();
          }}
        >
          로그인화면으로 이동
        </Button>
      </Stack>
    </Grid>
  );
}
