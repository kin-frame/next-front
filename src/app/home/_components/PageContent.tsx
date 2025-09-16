"use client";
import Image from "next/image";
import { Grid, Skeleton, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import api, { PagebleResDto } from "@/shared/api";

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
        <Grid size={1} key={v.id}>
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
    queryKey: ["files", "presinged-url", fileId],
    queryFn: async () =>
      (
        await api.get<{ url: string }>("/file/presigned-url", {
          params: { fileId },
        })
      ).data,
  });

  return (
    <Stack
      sx={{
        width: "100%",
        ["img"]: {
          width: "100%",
          height: "auto",
          aspectRatio: 1,
          objectFit: "cover",
        },
      }}
    >
      {isFetching || !data?.url ? (
        <Skeleton />
      ) : (
        <Image src={data?.url} alt="" width={300} height={300} />
      )}
    </Stack>
  );
}
