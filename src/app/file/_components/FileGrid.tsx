"use client";
import { Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import api, { PagebleResDto } from "@/shared/api";
import theme from "@/shared/mui/theme";
import FilePreview from "./FilePreview";

export default function FileGrid() {
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
      <Grid size={12}>
        <Typography fontWeight={700}>
          {dayjs().format("YYYY년 M월 D일")}
        </Typography>
      </Grid>
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
