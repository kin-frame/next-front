"use client";
import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import api from "@/shared/api";

export default function PageContent() {
  const { data } = useQuery({
    queryKey: ["files", { page: 0, size: 10, sort: ["lastModified,DESC"] }],
    queryFn: () =>
      api.get("file", {
        params: {
          page: 0,
          size: 10,
          sort: ["lastModified,DESC", "createdAt,ASC"],
        },
        paramsSerializer: { indexes: null },
      }),
  });

  return <Stack>파일 목록을 보여주기 {JSON.stringify(data)}</Stack>;
}
