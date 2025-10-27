import PageWrapper from "@/entities/PageWrapper";
import ResultTable from "./_components/ResultTable";

export default async function Page() {
  return (
    <PageWrapper>
      <ResultTable />
    </PageWrapper>
  );
}
