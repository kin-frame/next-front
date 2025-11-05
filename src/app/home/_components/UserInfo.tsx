"use client";
import {
  Avatar,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import api from "@/shared/api";
import theme from "@/shared/mui/theme";

export default function UserInfo() {
  const { data, isLoading } = useQuery({
    queryKey: ["user", "me"],
    queryFn: async () =>
      api.get<null, { name: string; email: string }>(`/user/me`, {}),
  });
  const name = data?.name || "회원";
  const email = data?.email || "";

  return (
    <Grid size={12}>
      <Paper
        elevation={2}
        aria-label="사용자 정보"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          p: "16px",
          [theme.breakpoints.down("lg")]: { p: "12px" },
        }}
      >
        {isLoading ? (
          <>
            <Skeleton variant="circular" width={44} height={44} />
            <Stack sx={{ gap: "2px" }}>
              <Skeleton variant="text" width={160} />
              <Skeleton variant="text" width={220} />
            </Stack>
          </>
        ) : (
          <>
            <Avatar sx={{ width: 44, height: 44 }}>
              {getInitials(name, email)}
            </Avatar>
            <Stack sx={{ gap: "2px" }}>
              <Typography fontWeight={700} fontSize={18}>
                안녕하세요! {name}님
              </Typography>
              <Typography variant="body2" color="text.secondary">
                접속 이메일: {email}
              </Typography>
            </Stack>
          </>
        )}
      </Paper>
    </Grid>
  );
}
function getInitials(name?: string, email?: string) {
  const n = (name || "").trim();
  if (n) {
    const parts = n.split(/\s+/);
    const first = parts[0]?.[0] ?? "";
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
    return `${first}${last}`.toUpperCase() || first.toUpperCase();
  }
  const local = (email || "").split("@")[0] || "";
  return local.slice(0, 2).toUpperCase() || "?";
}
