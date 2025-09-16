"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

import api from "@/shared/api";
import theme from "@/shared/mui/theme";

export default function PageContent() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<{
    name: string;
    message: string;
  }>();

  const { mutate: signup } = useMutation({
    mutationFn: ({
      body,
    }: {
      body: {
        name: string;
        message: string;
      };
    }) => api.post(`/user/signup`, body),
    onSuccess: () => {
      router.push("/signup/info");
    },
  });

  const { mutate: signupCheck } = useMutation({
    mutationFn: () => api.get<{ status: string }>(`/user/signup/check`),
    onSuccess: ({ data }) => {
      // 회원가입 신청 단계가 아니면 info로 이동
      // TODO: 회원가입 거부되었을 때 관련 페이지로 이동해야 함
      if (data.status !== "PENDING") {
        router.push("/signup/info");
      }
    },
  });

  useEffect(() => {
    signupCheck();
  }, [signupCheck]);

  return (
    <Grid size={12}>
      <Stack
        component="form"
        onSubmit={handleSubmit((data) => {
          signup({ body: data });
        })}
        sx={{
          gap: "24px",
          [theme.breakpoints.down("lg")]: {
            gap: "16px",
          },
        }}
      >
        <Typography fontWeight={700} fontSize={25}>
          회원가입
        </Typography>
        <TextField
          {...register("name", { required: true })}
          size="small"
          label="이름"
        />
        <TextField
          {...register("message", { required: true })}
          size="small"
          label="요청사항"
          multiline
          rows={5}
        />
        <Button type="submit" color="primary">
          신청하기
        </Button>
      </Stack>
    </Grid>
  );
}
