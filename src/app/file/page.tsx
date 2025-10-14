import PageWrapper from "@/entities/PageWrapper";
import PageContent from "./_components/PageContent";
import ToggleListType from "./_components/ToggleListType";

export default async function Page() {
  return (
    <PageWrapper>
      <ToggleListType />
      <PageContent />
    </PageWrapper>
  );
}
