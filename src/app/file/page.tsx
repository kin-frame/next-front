import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import PageWrapper from "@/entities/PageWrapper";
import { directoryQuery } from "@/services/directory/query";
import { getQueryClient } from "../_query/get-query-client";
import PageContent from "./_components/PageContent";
import PageHeader from "./_components/PageHeader";

export default async function Page({
  params,
  searchParams,
}: PageProps<"/file">) {
  await params;
  const { directoryId } = await searchParams;

  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      ...directoryQuery.getRootDirectory(),
    }),
    queryClient.prefetchQuery({
      ...directoryQuery.getDirectoryInfo({
        query: { directoryId: Number(directoryId) },
      }),
    }),
    queryClient.prefetchQuery({
      ...directoryQuery.getDirectoryChildren({
        query: { directoryId: Number(directoryId) },
      }),
    }),
  ]);

  return (
    <PageWrapper>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PageHeader />
        <PageContent />
      </HydrationBoundary>
    </PageWrapper>
  );
}
