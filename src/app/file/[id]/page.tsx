import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient } from "@/app/_query/get-query-client";
import PageWrapper from "@/entities/PageWrapper";
import { fileQuery } from "@/services/file/query";
import PageContent from "./_components/PageContent";

export default async function Page({
  params,
  searchParams,
}: PageProps<"/file/[id]">) {
  const { id } = await params;
  await searchParams;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    ...fileQuery.getFileInfo({ path: { id: Number(id) } }),
  });
  await queryClient.prefetchQuery({
    ...fileQuery.getPresignedUrl({ query: { fileId: Number(id) } }),
  });

  return (
    <PageWrapper>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PageContent />
      </HydrationBoundary>
    </PageWrapper>
  );
}
