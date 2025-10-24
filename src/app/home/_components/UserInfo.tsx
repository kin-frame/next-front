"use client";
import { Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import api from "@/shared/api";

export default function UserInfo() {
  const { data } = useQuery({
    queryKey: ["user", "me"],
    queryFn: async () =>
      api.get<null, { name: string; email: string }>(`/user/me`, {}),
  });

  return (
    <Grid size={12}>
      <Typography fontWeight={700} fontSize={25}>
        안녕하세요! {data?.name}님
      </Typography>
      <Typography>접속 이메일: {data?.email}</Typography>
    </Grid>
  );
}
