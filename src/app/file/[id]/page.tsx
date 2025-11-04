import PageWrapper from "@/entities/PageWrapper";
import PageContent from "./_components/PageContent";

export default async function Page({
  params,
  searchParams,
}: PageProps<"/file/[id]">) {
  await params;
  await searchParams;

  return (
    <PageWrapper>
      <PageContent />
    </PageWrapper>
  );
}
