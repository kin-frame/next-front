"use client";
import { useForm } from "react-hook-form";
import { Button, Stack, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";

import api from "@/shared/api";

export default function PageContent() {
  const { handleSubmit, register } = useForm<{ files: File[] }>();

  const { mutate: mutatePresignedUrl } = useMutation({
    mutationFn: ({
      body,
    }: {
      body: {
        lastModified: string;
        fileName: string;
        fileSize: number;
        fileType: string;
        file: File;
      };
    }) =>
      api.post<{ url: string; id: number }>("/file/presigned-url", {
        lastModified: body?.lastModified,
        fileName: body?.fileName,
        fileSize: body?.fileSize,
        fileType: body?.fileType,
      }),
    onSuccess: ({ data }, { body }) => {
      uploadS3({
        path: { url: data.url },
        body: { file: body.file, id: data.id },
      });
    },
  });

  const { mutate: uploadS3 } = useMutation({
    mutationFn: async ({
      path,
      body,
    }: {
      path: { url: string };
      body: { file: File; id: number };
    }) => {
      const res = await fetch(path.url, {
        method: "PUT",
        headers: { "Content-Type": body.file.type },
        body: body.file,
      });

      if (!res.ok) throw new Error("S3 업로드 실패");
    },
    onSuccess: (data, { body }) => {
      mutateFileMeta({
        body: {
          id: body.id,
        },
      });
    },
  });

  const { mutate: mutateFileMeta } = useMutation({
    mutationFn: ({ body }: { body: { id: number } }) =>
      api.post("/file/complete", {
        id: body.id,
      }),
  });

  return (
    <Stack
      component="form"
      sx={{ gap: "8px" }}
      onSubmit={handleSubmit((data) => {
        mutatePresignedUrl({
          body: {
            lastModified: dayjs(data.files[0].lastModified).toISOString(),
            fileName: data.files[0].name,
            fileSize: data.files[0].size,
            fileType: data.files[0].type,
            file: data.files[0],
          },
        });
      })}
    >
      <TextField
        {...register("files")}
        slotProps={{
          htmlInput: {
            multiple: true,
            accept: "image/*,video/*",
          },
        }}
        type="file"
        size="small"
      />
      <Button type="submit">전송</Button>
    </Stack>
  );
}
