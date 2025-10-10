"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Grid, Skeleton, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import api from "@/shared/api";

export default function PageContent() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const { data } = useQuery({
    queryKey: ["files", id],
    queryFn: async () =>
      (await api.get<{ fileType: string }>(`/file/${id}`, {})).data,
  });

  const isImage = data?.fileType.includes("image");
  const isVideo = data?.fileType.includes("video");

  const { data: urlData, isFetching } = useQuery({
    queryKey: ["files", "presinged-url", id],
    queryFn: async () =>
      (
        await api.get<{ url: string }>("/file/presigned-url", {
          params: { fileId: id },
        })
      ).data,
    enabled: isVideo,
  });

  if (isFetching)
    return (
      <Grid size={12} alignSelf="stretch">
        <Skeleton
          variant="rectangular"
          sx={{
            flex: 1,
          }}
        />
      </Grid>
    );

  return (
    <Grid size={12}>
      <Stack
        sx={{
          position: "relative",
          ["img"]: {
            width: "100%",
            objectFit: "contain",
            flex: 1,
          },
          ["video"]: {
            width: "100%",
            maxHeight: "80vh",
          },
        }}
      >
        {isImage && <FileImage />}
        {isVideo && (
          <video
            // src={`${process.env.NEXT_PUBLIC_API_URL}/file/stream/${id}`}
            src={urlData?.url}
            controls
          />
        )}
      </Stack>
    </Grid>
  );
}

function FileImage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const { data: urlData } = useQuery({
    queryKey: ["files", "presinged-url", id],
    queryFn: async () =>
      (
        await api.get<{ url: string }>("/file/presigned-url", {
          params: { fileId: id },
        })
      ).data,
  });

  if (!urlData) {
    return <Typography>이미지를 불러올 수 없습니다.</Typography>;
  }

  return (
    <Image
      src={urlData?.url}
      alt=""
      aria-hidden
      width={10000}
      height={10000}
      priority
    />
  );
}
