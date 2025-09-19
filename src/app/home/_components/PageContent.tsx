"use client";
import Image from "next/image";
import { Grid, Skeleton, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import api, { PagebleResDto } from "@/shared/api";
import theme from "@/shared/mui/theme";

export default function PageContent() {
  const { data } = useQuery({
    queryKey: [
      "files",
      "list",
      { page: 0, size: 10, sort: ["lastModified,DESC"] },
    ],
    queryFn: async () =>
      (
        await api.get<PagebleResDto<{ id: number }>>("file", {
          params: {
            page: 0,
            size: 10,
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
          <FilePreview fileId={v.id} />
        </Grid>
      ))}
    </>
  );
}

interface FilePreviewProps {
  fileId: number;
}

function FilePreview({ fileId }: FilePreviewProps) {
  const { data, isFetching } = useQuery({
    queryKey: ["files", "presinged-url", "thumbnail", fileId],
    queryFn: async () =>
      (
        await api.get<{ url: string }>("/file/presigned-url/thumbnail", {
          params: { fileId },
        })
      ).data,
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
      {isFetching || !data?.url ? (
        <Skeleton variant="rectangular" sx={{ flex: 1 }} />
      ) : (
        <Image src={data?.url} alt="" width={300} height={300} />
      )}
    </Stack>
  );
}
