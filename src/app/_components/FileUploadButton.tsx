"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import {
  Button,
  Drawer,
  IconButton,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

import { directoryQuery } from "@/services/directory/query";
import api from "@/shared/api";
import { ROLES } from "@/shared/config/roles";
import useUserContext from "@/shared/hook/useUserContext";
import { getFileMetaSize } from "@/shared/util/file";

interface FileItem {
  file: File;
  progress: number;
}

export default function FileUploadButton() {
  const { isLogin, role } = useUserContext();

  const searchParams = useSearchParams();

  const { data: rootData } = useQuery({
    ...directoryQuery.getRootDirectory(),
  });

  const directoryId =
    Number(searchParams.get("directoryId")) || rootData?.id || 0;

  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(open);
    };

  const { handleSubmit, register, reset, watch } = useForm<{ files: File[] }>({
    defaultValues: { files: [] },
  });

  const filesValue = watch("files");

  useEffect(() => {
    setFiles(Array.from(filesValue).map((v) => ({ progress: 0, file: v })));
  }, [filesValue]);

  const { mutate: mutatePresignedUrl, isPending: isPendingUrl } = useMutation({
    mutationFn: ({
      body,
    }: {
      body: {
        lastModified: string;
        fileName: string;
        fileSize: number;
        fileType: string;
        file: File;
        width: number;
        height: number;
      };
    }) =>
      api.post<null, { url: string; id: number }>("/file/presigned-url", {
        lastModified: body?.lastModified,
        fileName: body?.fileName,
        fileSize: body?.fileSize,
        fileType: body?.fileType,
        width: body?.width,
        height: body.height,
        directoryId,
      }),
    onSuccess: (data, { body }) => {
      uploadS3({
        path: { url: data.url },
        body: { file: body.file, id: data.id },
      });
    },
  });

  const { mutate: uploadS3, isPending: isPendingUploadS3 } = useMutation({
    mutationFn: async ({
      path,
      body,
    }: {
      path: { url: string };
      body: { file: File; id: number };
    }) => {
      await axios.put(path.url, body.file, {
        headers: { "Content-Type": body.file.type },
        onUploadProgress: (progressEvent) => {
          setFiles((prev) => {
            const targetIndex = prev.findIndex(
              (v) => v.file.name === body.file.name
            );

            if (targetIndex < 0) return prev;

            return [
              ...prev.slice(0, targetIndex),
              { ...prev[targetIndex], progress: progressEvent.progress || 0 },
              ...prev.slice(targetIndex + 1),
            ];
          });
        },
      });
    },
    onSuccess: (data, { body }) => {
      mutateFileMeta({
        body: {
          id: body.id,
        },
      });
    },
  });

  const { mutate: mutateFileMeta, isPending: isPendingFileMeta } = useMutation({
    mutationFn: ({ body }: { body: { id: number } }) =>
      api.post("/file/complete", {
        id: body.id,
      }),
    onSuccess: () => {
      setOpen(false);
      reset();
      queryClient.invalidateQueries({
        queryKey: ["files", "list"],
      });
      queryClient.invalidateQueries({
        queryKey: directoryQuery.getDirectoryChildren({
          query: { directoryId },
        }).queryKey,
      });
    },
  });

  if (!isLogin || role === ROLES.GUEST) return null;

  return (
    <>
      <IconButton onClick={toggleDrawer(true)} aria-label="파일 업로드하기">
        <FileUploadOutlinedIcon />
      </IconButton>
      <Drawer anchor={"bottom"} open={open} onClose={toggleDrawer(false)}>
        <Stack
          component="form"
          sx={{ gap: "8px", p: "8px" }}
          onSubmit={handleSubmit((data) => {
            Array.from(data.files).forEach(async (file) => {
              const { width, height } = await getFileMetaSize(file);
              mutatePresignedUrl({
                body: {
                  lastModified: dayjs(file.lastModified).toISOString(),
                  fileName: file.name,
                  fileSize: file.size,
                  fileType: file.type,
                  file: file,
                  width,
                  height,
                },
              });
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
          {files?.map((f) => (
            <Stack
              key={f.file.name}
              sx={{
                gap: "4px",
              }}
            >
              <Stack
                sx={{ flexDirection: "row", justifyContent: "space-between" }}
              >
                <Typography fontSize={12}>
                  {f.file.name} (
                  {Math.floor(f.file.size / 1024).toLocaleString()}KB)
                </Typography>
              </Stack>
              <LinearProgress value={f.progress * 100} variant="determinate" />
            </Stack>
          ))}
          <Button
            type="submit"
            loading={isPendingFileMeta || isPendingUploadS3 || isPendingUrl}
          >
            전송
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}
