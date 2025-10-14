import PageWrapper from "@/entities/PageWrapper";
import PageContent from "./_components/PageContent";
import PageHeader from "./_components/PageHeader";

export default async function Page() {
  return (
    <PageWrapper>
      <PageHeader />
      <PageContent />
    </PageWrapper>
  );
}
