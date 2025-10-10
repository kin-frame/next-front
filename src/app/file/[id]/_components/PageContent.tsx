"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Button, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import api from "@/shared/api";

export default function PageContent() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const { data } = useQuery({
    queryKey: ["files", id],
    queryFn: async () =>
      (
        await api.get<{ fileType: string; width: number; height: number }>(
          `/file/${id}`,
          {}
        )
      ).data,
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
      <Grid
        size={12}
        alignSelf="stretch"
        sx={{
          height: "500px",
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: "unset",
            aspectRatio:
              data?.height && data.width ? data.width / data.height : 0,
          }}
        />
      </Grid>
    );

  return (
    <Grid size={12}>
      <Stack
        sx={{
          position: "relative",
          gap: "16px",
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
        <Button
          variant="outlined"
          startIcon={<MenuOutlinedIcon />}
          sx={{
            alignSelf: "flex-start",
          }}
          LinkComponent={Link}
          href={`/file`}
        >
          목록
        </Button>
      </Stack>
    </Grid>
  );
}

function FileImage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const [loaded, setLoaded] = useState(false);

  const { data } = useQuery({
    queryKey: ["files", id],
    queryFn: async () =>
      (
        await api.get<{ fileType: string; width: number; height: number }>(
          `/file/${id}`,
          {}
        )
      ).data,
  });

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
    <>
      {!loaded && (
        <Skeleton
          variant="rectangular"
          sx={{
            position: "absolute",
            width: "100%",
            height: "unset",
            aspectRatio:
              data?.height && data.width ? data.width / data.height : 0,
          }}
        />
      )}
      <Image
        src={urlData?.url}
        alt=""
        aria-hidden
        width={data?.width}
        height={data?.height}
        priority
        onLoad={() => {
          setLoaded(true);
        }}
      />
    </>
  );
}
