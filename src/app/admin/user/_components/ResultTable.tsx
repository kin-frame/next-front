"use client";
import { useSearchParams } from "next/navigation";
import { Grid, Stack } from "@mui/material";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import RecordTable from "@/entities/RecordTable";
import RouterPagination from "@/entities/RouterPagination";
import { adminQuery } from "@/services/admin/query";
import { formatDate } from "@/shared/util/common";
import SearchForm from "./SearchForm";

export default function ResultTable() {
  const searchParams = useSearchParams();
  const { data } = useQuery({
    ...adminQuery.getAdminUserList({
      query: {
        keywordType: "email",
        keyword: searchParams.get("keyword") || "",
        page: Number(searchParams.get("page")) || 0,
        size: Number(searchParams.get("size")) || 10,
        sort: ["createdAt,ASC"],
      },
    }),
    placeholderData: keepPreviousData,
  });

  return (
    <Grid size={12}>
      <SearchForm />
      <Stack
        sx={{
          overflowX: "auto",
          mb: "8px",
        }}
      >
        <RecordTable
          caption="사용자 목록"
          data={data?.content || []}
          columns={[
            {
              dataIndex: "email",
              key: "email",
              title: "이메일",
              width: "320px",
            },
            {
              dataIndex: "name",
              key: "name",
              title: "이름",
              width: "240px",
            },
            {
              dataIndex: "status",
              key: "status",
              title: "상태",
              width: "120px",
              align: "center",
            },
            {
              dataIndex: "role",
              key: "role",
              title: "권한",
              width: "120px",
              align: "center",
            },
            {
              dataIndex: "createdAt",
              key: "createdAt",
              title: "등록일",
              width: "120px",
              align: "center",
              render: (v) => formatDate(v),
            },
            {
              dataIndex: "lastLoginedAt",
              key: "lastLoginedAt",
              title: "최종 로그인",
              width: "120px",
              align: "center",
              onCellSx: (v) =>
                v
                  ? {
                      whiteSpace: "pre-line",
                    }
                  : {
                      lineHeight: "300%",
                    },
              render: (v) => formatDate(v, "YYYY.MM.DD\nHH:mm:ss"),
            },
            {
              dataIndex: "fileCount",
              key: "fileCount",
              title: "업로드 파일 제한",
              width: "120px",
              align: "right",
              render: (v) => v.toLocaleString(),
            },
            {
              dataIndex: "maxFileSize",
              key: "maxFileSize",
              title: "용량 제한",
              width: "120px",
              align: "right",
              render: (v) => v.toLocaleString(),
            },
          ]}
        />
      </Stack>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <RouterPagination count={data?.totalPages} />
      </Stack>
    </Grid>
  );
}
