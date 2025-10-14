"use client";
import Link from "next/link";
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
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import api, { PagebleResDto } from "@/shared/api";
import { formatFileSize } from "@/shared/util/file";
import FileListPreview from "./FileListPreview";

export default function FileList() {
  const { data } = useQuery({
    queryKey: [
      "files",
      "list",
      { page: 0, size: 20, sort: ["lastModified,DESC"] },
    ],
    queryFn: async () =>
      (
        await api.get<
          PagebleResDto<{
            id: number;
            userId: number;
            key: string;
            lastModified: string;
            fileName: string;
            fileSize: number;
            fileType: string;
            status: string;
            createdAt: string;
            updatedAt: string;
            thumbnailKey: string;
            width: number;
            height: number;
          }>
        >("file", {
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
      <Grid size={12}>
        <Typography fontWeight={700}>
          {dayjs().format("YYYY년 M월 D일")}
        </Typography>
      </Grid>
      <Grid size={12}>
        <List>
          {data?.content.map((v) => (
            <ListItem key={v.id} disablePadding>
              <ListItemButton
                sx={{
                  px: "4px",
                }}
                LinkComponent={Link}
                href={`/file/${v.id}`}
              >
                <ListItemAvatar>
                  <FileListPreview fileId={v.id} fileType={v.fileType} />
                </ListItemAvatar>
                <ListItemText
                  sx={{ overflow: "hidden" }}
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
