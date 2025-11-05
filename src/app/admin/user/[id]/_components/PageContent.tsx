"use client";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { adminMutation, adminQuery } from "@/services/admin/query";
import { UnwrapApiRequest } from "@/shared/api";

export default function PageContent() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery({
    ...adminQuery.getAdminUserInfo({ path: { id } }),
  });

  const {
    handleSubmit,
    register,
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
  });

  const { mutate, isPending: isSaving } = useMutation({
    ...adminMutation.updateUserFileLimit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "user", id, "info"],
      });
    },
  });

  if (isPending) {
    return (
      <Card>
        <CardContent>
          <Skeleton width={220} height={28} />
          <Skeleton width={340} />
          <Skeleton width={180} />
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return <Alert severity="error">사용자 정보를 불러오지 못했습니다.</Alert>;
  }

  const saveDisabled = isSaving || !isDirty;

  return (
    <Stack gap={2}>
      <Card>
        <CardContent>
          <Stack gap={1}>
            <Typography variant="h6">{data.name || "-"}</Typography>
            <Typography color="text.secondary">{data.email}</Typography>
            <Stack direction="row" gap={1}>
              <Chip label={`상태: ${data.status}`} size="small" />
              <Chip label={`권한: ${data.role}`} size="small" />
            </Stack>
            <Divider />
            <Typography variant="body2">가입일: {data.createdAt}</Typography>
            <Typography variant="body2">
              최근 로그인: {data.lastLoginedAt}
            </Typography>
            <Typography variant="body2">
              최근 IP: {data.lastLoginedIp}
            </Typography>
          </Stack>
        </CardContent>
      </Card>

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
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            파일 사용 제한
          </Typography>
          <Stack direction="row" gap={2}>
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
            <TextField
              {...register("maxFileSize", {
                required: true,
                valueAsNumber: true,
              })}
              label="최대 파일 크기(바이트)"
              type="number"
              size="small"
              slotProps={{
                htmlInput: {
                  min: 0,
                },
              }}
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
    </Stack>
  );
}
