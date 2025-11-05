import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient } from "@/app/_query/get-query-client";
import PageWrapper from "@/entities/PageWrapper";
import { adminQuery } from "@/services/admin/query";
import PageContent from "./_components/PageContent";

export default async function Page({
  params,
  searchParams,
}: PageProps<"/admin/user/[id]">) {
  const { id } = await params;
  await searchParams;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    ...adminQuery.getAdminUserInfo({ path: { id: Number(id) } }),
  });

  return (
    <PageWrapper>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PageContent />
      </HydrationBoundary>
    </PageWrapper>
  );
}
