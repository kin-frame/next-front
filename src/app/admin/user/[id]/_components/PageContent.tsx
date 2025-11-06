"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import MuiLink from "@/entities/MuiLink";
import MuiSelect from "@/entities/MuiSelect";
import { adminMutation, adminQuery } from "@/services/admin/query";
import { UnwrapApiRequest } from "@/shared/api";
import { formatDate } from "@/shared/util/common";
import { parseMaskedValue } from "@/shared/util/form";

export default function PageContent() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const { data, isPending, isError } = useQuery({
    ...adminQuery.getAdminUserInfo({ path: { id } }),
  });

  if (isPending) {
    return (
      <Grid size={12}>
        <Card>
          <CardContent>
            <Skeleton width={220} height={28} />
            <Skeleton width={340} />
            <Skeleton width={180} />
          </CardContent>
        </Card>
      </Grid>
    );
  }

  if (isError || !data) {
    return <Alert severity="error">사용자 정보를 불러오지 못했습니다.</Alert>;
  }

  return (
    <Grid size={12}>
      <Stack gap={2}>
        <UserInfoCard />
        <UserFileCard />
        <UserRoleCard />

        <Stack
          sx={{
            flexDirection: "row",
          }}
        >
          <Button
            component={MuiLink}
            href={`/admin/user`}
            load
            variant="outlined"
            size="small"
          >
            목록으로
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
}

function UserInfoCard() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const { data } = useQuery({
    ...adminQuery.getAdminUserInfo({ path: { id } }),
  });

  return (
    <Card>
      <CardContent>
        <Stack gap={1}>
          <Typography
            sx={{
              fontSize: 21,
              fontWeight: 500,
            }}
          >
            {data?.name || "-"}
          </Typography>
          <Typography color="text.secondary">{data?.email}</Typography>
          <Stack direction="row" gap={1}>
            <Chip label={`상태: ${data?.status}`} size="small" />
          </Stack>
          <Divider />
          <Typography variant="body2">
            가입일: {formatDate(data?.createdAt)}
          </Typography>
          <Typography variant="body2">
            최근 로그인:{" "}
            {formatDate(data?.lastLoginedAt, "YYYY.MM.DD HH:mm:ss")}
          </Typography>
          <Typography variant="body2">
            최근 접속 IP: {data?.lastLoginedIp}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

function UserFileCard() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    ...adminQuery.getAdminUserInfo({ path: { id } }),
  });

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { isDirty },
  } = useForm<
    UnwrapApiRequest<
      (typeof adminMutation.updateUserFileLimit)["mutationFn"]
    >["body"]
  >({
    defaultValues: {
      fileCount: data?.fileCount,
      maxFileSize: data?.maxFileSize,
    },
    mode: "onChange",
  });

  const { mutate, isPending: isSaving } = useMutation({
    ...adminMutation.updateUserFileLimit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminQuery.getAdminUserInfo({ path: { id } }).queryKey,
      });
    },
  });

  useEffect(() => {
    reset({
      fileCount: data?.fileCount,
      maxFileSize: data?.maxFileSize,
    });
  }, [data?.fileCount, data?.maxFileSize, reset]);

  const saveDisabled = isSaving || !isDirty || isFetching;

  return (
    <Card
      component="form"
      onSubmit={handleSubmit(
        (data) => {
          mutate({
            path: { id },
            body: {
              fileCount: data.fileCount,
              maxFileSize: parseMaskedValue(data.maxFileSize),
            },
          });
        },
        (error) => console.log(error)
      )}
    >
      <CardContent>
        <Typography sx={{ mb: 1 }}>파일 사용 제한</Typography>
        <Stack
          sx={{
            gap: "8px",
          }}
        >
          <TextField
            {...register("fileCount", {
              required: true,
              valueAsNumber: true,
            })}
            label="파일 개수"
            type="number"
            size="small"
            slotProps={{
              htmlInput: {
                type: "number",
                min: 0,
              },
            }}
          />
          <Controller
            control={control}
            name="maxFileSize"
            render={({ field }) => (
              <Stack
                sx={{
                  gap: "4px",
                }}
              >
                <NumericFormat
                  {...field}
                  thousandSeparator
                  allowNegative={false}
                  customInput={TextField}
                  valueIsNumericString
                  label="최대 파일 크기(Byte)"
                  size="small"
                  slotProps={{
                    htmlInput: {
                      inputMode: "numeric",
                      min: 0,
                    },
                  }}
                />
                <Stack sx={{ flexDirection: "row", gap: "2px" }}>
                  <Button
                    size="xsmall"
                    onClick={() => {
                      field.onChange(2 * 1024 * 1024);
                    }}
                  >
                    2MB
                  </Button>
                  <Button
                    size="xsmall"
                    onClick={() => {
                      field.onChange(5 * 1024 * 1024);
                    }}
                  >
                    5MB
                  </Button>
                  <Button
                    size="xsmall"
                    onClick={() => {
                      field.onChange(10 * 1024 * 1024);
                    }}
                  >
                    10MB
                  </Button>
                </Stack>
              </Stack>
            )}
          />
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          type="submit"
          variant="contained"
          size="small"
          disabled={saveDisabled}
        >
          {isSaving ? "저장 중..." : "저장"}
        </Button>
      </CardActions>
    </Card>
  );
}

function UserRoleCard() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    ...adminQuery.getAdminUserInfo({ path: { id } }),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm<
    UnwrapApiRequest<
      (typeof adminMutation.updateUserRole)["mutationFn"]
    >["body"]
  >({
    defaultValues: {
      role: data?.role,
    },
  });

  const { mutate, isPending: isSaving } = useMutation({
    ...adminMutation.updateUserRole,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminQuery.getAdminUserInfo({ path: { id } }).queryKey,
      });
    },
  });

  useEffect(() => {
    reset({ role: data?.role });
  }, [data?.role, reset]);

  const saveDisabled = isSaving || !isDirty || isFetching;

  return (
    <Card
      component="form"
      onSubmit={handleSubmit((data) => {
        mutate({
          path: { id },
          body: data,
        });
      })}
    >
      <CardContent>
        <Typography sx={{ mb: 1 }}>사용자 권한 제어</Typography>
        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <MuiSelect
              {...field}
              label="권한"
              size="small"
              sx={{ width: "200px" }}
            >
              <option value="ADMIN">관리자</option>
              <option value="USER">사용자</option>
              <option value="GUEST">게스트</option>
            </MuiSelect>
          )}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          type="submit"
          variant="contained"
          size="small"
          disabled={saveDisabled}
        >
          {isSaving ? "저장 중..." : "저장"}
        </Button>
      </CardActions>
    </Card>
  );
}
