import PageWrapper from "@/entities/PageWrapper";
import { PageProps } from "@/shared/api";
import PageContent from "./_components/PageContent";

export default async function Page({ params, searchParams }: PageProps) {
  await params;
  await searchParams;

  return (
    <PageWrapper>
      <PageContent />
    </PageWrapper>
  );
}
