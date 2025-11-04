import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient } from "@/app/_query/get-query-client";
import PageWrapper from "@/entities/PageWrapper";
import { adminQuery } from "@/services/admin/query";
import ResultTable from "./_components/ResultTable";

export default async function Page({
  params,
  searchParams,
}: PageProps<"/admin/user">) {
  await params;
  const { keyword, page, size } = await searchParams;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    ...adminQuery.getAdminUserList({
      query: {
        keywordType: "email",
        keyword: String(keyword || ""),
        page: Number(page) || 0,
        size: Number(size) || 10,
        sort: ["createdAt,ASC"],
      },
    }),
  });

  return (
    <PageWrapper>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ResultTable />
      </HydrationBoundary>
    </PageWrapper>
  );
}
