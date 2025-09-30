"use client";
import { useParams } from "next/navigation";
import { Stack } from "@mui/material";
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

  // const isImage = data?.fileType.includes("image");
  const isVideo = data?.fileType.includes("video");

  const { data: urlData } = useQuery({
    queryKey: ["files", "presinged-url", id],
    queryFn: async () =>
      (
        await api.get<{ url: string }>("/file/presigned-url", {
          params: { fileId: id },
        })
      ).data,
    enabled: isVideo,
  });

  return (
    <Stack
      sx={{
        ["video"]: {
          width: "100%",
          maxHeight: "80vh",
        },
      }}
    >
      {isVideo && (
        <video
          // src={`${process.env.NEXT_PUBLIC_API_URL}/file/stream/${id}`}
          src={urlData?.url}
          controls
        />
      )}
    </Stack>
  );
}
