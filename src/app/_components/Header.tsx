"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {
  Button,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

import api from "@/shared/api";
import theme from "@/shared/mui/theme";

export default function Header() {
  return (
    <Stack
      sx={{
        alignItems: "center",
        boxShadow: theme.shadows[1],
      }}
    >
      <Stack
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          bgcolor: "white",

          width: "100%",
          maxWidth: "1200px",
          py: "16px",
          [theme.breakpoints.down("lg")]: {
            px: "8px",
            py: "8px",
          },
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography fontWeight={700} fontSize={24}>
          Kinframes
        </Typography>
        <Stack
          sx={{
            flexDirection: "row",
            ml: "auto",
          }}
        >
          <FileUploadButton />
          <IconButton>
            <MenuOutlinedIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
}

function FileUploadButton() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

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

  const { handleSubmit, register, reset } = useForm<{ files: File[] }>();

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
    onSuccess: () => {
      setOpen(false);
      reset();
      queryClient.invalidateQueries({
        queryKey: ["files", "list"],
      });
    },
  });

  return (
    <>
      <IconButton onClick={toggleDrawer(true)}>
        <FileUploadOutlinedIcon />
      </IconButton>
      <Drawer anchor={"bottom"} open={open} onClose={toggleDrawer(false)}>
        <Stack
          component="form"
          sx={{ gap: "8px", p: "8px" }}
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
      </Drawer>
    </>
  );
}
