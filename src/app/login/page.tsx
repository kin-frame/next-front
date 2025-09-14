import PageWrapper from "@/entities/PageWrapper";
import PageContent from "./_component/PageContent";

export default async function Page() {
  return (
    <PageWrapper>
      <PageContent url={`${process.env.API_URL}/auth/google`} />
    </PageWrapper>
  );
}
