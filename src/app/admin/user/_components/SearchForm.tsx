"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, MenuItem, Select, Stack, TextField } from "@mui/material";

import { adminApi } from "@/services/admin";
import { UnwrapApiRequest } from "@/shared/api";
import useGetSearchParams from "@/shared/hook/useGetSearchParams";

export default function SearchForm() {
  const [searchParams, getSearchParams] = useGetSearchParams();
  const router = useRouter();

  const { handleSubmit, register, reset, control } =
    useForm<UnwrapApiRequest<typeof adminApi.getAdminUserList>["query"]>();

  useEffect(() => {
    reset({
      keywordType: searchParams.get("keywordType") || "email",
      keyword: searchParams.get("keyword") || "",
    });
  }, [reset, searchParams]);

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit((data) => {
        const newSearchParams = getSearchParams(data);

        router.push(`?${newSearchParams.toString()}`);
      })}
      sx={{
        mb: "16px",
        gap: "8px",
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          gap: "8px",
        }}
      >
        <Controller
          control={control}
          name="keywordType"
          defaultValue={"email"}
          render={({ field }) => (
            <Select
              {...field}
              size="small"
              sx={{
                width: "120px",
              }}
            >
              <MenuItem value="email">이메일</MenuItem>
              <MenuItem value="name">이름</MenuItem>
            </Select>
          )}
        />
        <TextField
          {...register("keyword")}
          size="small"
          fullWidth
          placeholder="검색어"
        />
      </Stack>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button type="submit" size="small">
          검색
        </Button>
      </Stack>
    </Stack>
  );
}
