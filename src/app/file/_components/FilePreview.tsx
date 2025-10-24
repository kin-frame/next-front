import Image from "next/image";
import Link from "next/link";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import api from "@/shared/api";

interface FilePreviewProps {
  fileId: number;
  fileType: string;
}

export default function FilePreview({ fileId, fileType }: FilePreviewProps) {
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
    queryFn: async () =>
      api.get<null, { url: string }>("/file/presigned-url", {
        params: { fileId },
      }),
    enabled: !isImage,
  });

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      {isImage ? (
        <IconButton
          sx={{
            position: "relative",
            flex: "1 1 auto",
            overflow: "hidden",
            padding: 0,
            borderRadius: 0,
            ["img"]: {
              height: "100%",
              width: "100%",
              objectFit: "cover",
            },
          }}
          aria-label="이미지 자세히보기"
          LinkComponent={Link}
          href={`/file/${fileId}`}
        >
          {isFetching || !data?.url ? (
            <Skeleton
              variant="rectangular"
              sx={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Image src={data?.url} alt="" width={300} height={300} />
          )}
        </IconButton>
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
            aria-label="영상 자세히보기"
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
