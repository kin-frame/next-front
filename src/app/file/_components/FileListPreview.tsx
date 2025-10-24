import Image from "next/image";
import { Skeleton, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import api from "@/shared/api";
import theme from "@/shared/mui/theme";

interface FileListPreviewProps {
  fileId: number;
  fileType: string;
}

export default function FileListPreview({
  fileId,
  fileType,
}: FileListPreviewProps) {
  const isImage = fileType.includes("image");

  const { data, isFetching } = useQuery({
    queryKey: ["files", "presinged-url", "thumbnail", fileId],
    queryFn: () =>
      api.get<null, { url: string }>("/file/presigned-url/thumbnail", {
        params: { fileId },
      }),
    enabled: isImage,
  });

  const { data: urlData } = useQuery({
    queryKey: ["files", "presinged-url", fileId],
    queryFn: () =>
      api.get<null, { url: string }>("/file/presigned-url", {
        params: { fileId },
      }),
    enabled: !isImage,
  });

  return (
    <Stack
      sx={{
        borderRadius: "4px",
        overflow: "hidden",

        width: "80px",
        height: "80px",
        [theme.breakpoints.down("lg")]: {
          width: "48px",
          height: "48px",
        },
        ["img"]: {
          height: "100%",
          width: "100%",
          objectFit: "cover",
        },
      }}
    >
      {isImage ? (
        <>
          {isFetching || !data?.url ? (
            <Skeleton
              variant="rectangular"
              sx={{ width: "100%", height: "100%" }}
            />
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
        </Stack>
      )}
    </Stack>
  );
}
