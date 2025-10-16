"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  listItemTextClasses,
  Typography,
} from "@mui/material";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import dayjs from "dayjs";

import { directoryApi } from "@/services/directory";
import { formatFileSize } from "@/shared/util/file";
import FileListPreview from "./FileListPreview";

export default function FileList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: rootData } = useQuery({
    queryKey: ["directory", "root"],
    queryFn: async () => (await directoryApi.getRootDirectory()).data,
  });

  const directoryId =
    Number(searchParams.get("directoryId")) || rootData?.id || 0;
  const isRoot =
    Number(searchParams.get("directoryId")) === rootData?.id ||
    !searchParams.get("directoryId");

  const { data } = useQuery({
    queryKey: ["directory", { directoryId }],
    queryFn: async () =>
      (await directoryApi.getDirectoryChildren({ query: { directoryId } }))
        .data,
    placeholderData: keepPreviousData,
    enabled: !!directoryId,
  });

  const { data: infoData } = useQuery({
    queryKey: ["directory", "info", { directoryId }],
    queryFn: async () =>
      (await directoryApi.getDirectoryInfo({ query: { directoryId } })).data,
    placeholderData: keepPreviousData,
    enabled: !!directoryId,
  });

  return (
    <>
      <Grid size={12}>
        <Typography fontWeight={700}>
          {dayjs().format("YYYY년 M월 D일")}
        </Typography>
      </Grid>
      <Grid size={12}>
        <List>
          {!isRoot && (
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  px: "4px",
                  gap: "8px",
                }}
                LinkComponent={Link}
                href={`/file?directoryId=${infoData?.parentId}`}
              >
                <ListItemText
                  sx={{
                    overflow: "hidden",
                    [`.${listItemTextClasses.primary},.${listItemTextClasses.secondary} `]:
                      {
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      },
                  }}
                  primary={".."}
                />
              </ListItemButton>
            </ListItem>
          )}
          {data?.directories.map((v) => (
            <ListItem key={v.id} disablePadding>
              <ListItemButton
                sx={{
                  px: "4px",
                  gap: "8px",
                }}
                LinkComponent={Link}
                href={`/file?directoryId=${v.id}`}
                onClick={async (event) => {
                  event.preventDefault();
                  await queryClient.prefetchQuery({
                    queryKey: ["directory", { directoryId: v.id }],
                    queryFn: async () =>
                      (
                        await directoryApi.getDirectoryChildren({
                          query: { directoryId: v.id },
                        })
                      ).data,
                  });
                  router.push(`/file?directoryId=${v.id}`);
                }}
              >
                <ListItemAvatar sx={{ minWidth: "48px", height: "48px" }}>
                  <FolderOutlinedIcon
                    sx={{
                      m: "6px",
                      fontSize: 36,
                      lineHeight: 1,
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    overflow: "hidden",
                    [`.${listItemTextClasses.primary},.${listItemTextClasses.secondary} `]:
                      {
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      },
                  }}
                  primary={v.directoryName}
                />
              </ListItemButton>
            </ListItem>
          ))}
          {data?.files.map((v) => (
            <ListItem key={v.id} disablePadding>
              <ListItemButton
                sx={{
                  px: "4px",
                  gap: "8px",
                }}
                LinkComponent={Link}
                href={`/file/${v.id}`}
              >
                <ListItemAvatar sx={{ minWidth: "48px" }}>
                  <FileListPreview fileId={v.id} fileType={v.fileType} />
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    overflow: "hidden",
                    [`.${listItemTextClasses.primary},.${listItemTextClasses.secondary} `]:
                      {
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      },
                  }}
                  primary={v.fileName}
                  secondary={dayjs(v.createdAt).format(
                    "YYYY년 MM월 DD일 H시 M분"
                  )}
                />
                <ListItemText
                  sx={{
                    flex: "0 0 64px",
                    [`.${listItemTextClasses.secondary}`]: {
                      textAlign: "right",
                      fontWeight: 700,
                    },
                  }}
                  secondary={formatFileSize(v.fileSize)}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
    </>
  );
}
