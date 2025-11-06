import PageWrapper from "@/entities/PageWrapper";
import PageContent from "./_components/PageContent";

export default async function Page({}: PageProps<"/chat">) {
  return (
    <PageWrapper>
      <PageContent />
    </PageWrapper>
  );
}
