"use client";
import Image from "next/image";
import Link from "next/link";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Grid, IconButton, Skeleton, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import api, { PagebleResDto } from "@/shared/api";
import theme from "@/shared/mui/theme";

export default function PageContent() {
  const { data } = useQuery({
    queryKey: [
      "files",
      "list",
      { page: 0, size: 20, sort: ["lastModified,DESC"] },
    ],
    queryFn: async () =>
      (
        await api.get<PagebleResDto<{ id: number; fileType: string }>>("file", {
          params: {
            page: 0,
            size: 20,
            sort: ["lastModified,DESC", "createdAt,ASC"],
          },
          paramsSerializer: { indexes: null },
        })
      ).data,
  });

  return (
    <>
      <Grid size={12}></Grid>
      {data?.content.map((v) => (
        <Grid
          size={1}
          key={v.id}
          sx={{
            aspectRatio: 1,
            overflow: "hidden",
            boxShadow: theme.shadows[2],

            [theme.breakpoints.up("lg")]: {
              borderRadius: "8px",
            },
            [theme.breakpoints.down("lg")]: {
              borderRadius: "6px",
            },
          }}
        >
          <FilePreview fileId={v.id} fileType={v.fileType} />
        </Grid>
      ))}
    </>
  );
}

interface FilePreviewProps {
  fileId: number;
  fileType: string;
}

function FilePreview({ fileId, fileType }: FilePreviewProps) {
  const isImage = fileType.includes("image");

  const { data, isFetching } = useQuery({
    queryKey: ["files", "presinged-url", "thumbnail", fileId],
    queryFn: async () =>
      (
        await api.get<{ url: string }>("/file/presigned-url/thumbnail", {
          params: { fileId },
        })
      ).data,
    enabled: isImage,
  });

  const { data: urlData } = useQuery({
    queryKey: ["files", "presinged-url", fileId],
    queryFn: async () =>
      (
        await api.get<{ url: string }>("/file/presigned-url", {
          params: { fileId },
        })
      ).data,
    enabled: !isImage,
  });

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        ["img"]: {
          width: "100%",
          height: "auto",
          aspectRatio: 1,
          objectFit: "cover",
        },
      }}
    >
      {isImage ? (
        <>
          {isFetching || !data?.url ? (
            <Skeleton variant="rectangular" sx={{ flex: 1 }} />
          ) : (
            <Image src={data?.url} alt="" width={300} height={300} />
          )}
        </>
      ) : (
        <Stack
          sx={{
            position: "relative",
            flex: "1 1 auto",
            overflow: "hidden",
            ["video"]: {
              height: "100%",
              width: "100%",
              objectFit: "cover",
            },
          }}
        >
          <video
            // src={`${process.env.NEXT_PUBLIC_API_URL}/file/stream/${fileId}`}
            src={urlData?.url}
            preload="metadata"
            muted
            playsInline
          />
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            aria-label="영상 재생하기"
            LinkComponent={Link}
            href={`/file/${fileId}`}
          >
            <PlayArrowIcon
              sx={{ color: "white", width: "40px", height: "40px" }}
            />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
}
