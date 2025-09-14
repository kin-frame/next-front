import PageWrapper from "@/entities/PageWrapper";
import Login from "./_components/LoginSection";

export default function Home() {
  return (
    <PageWrapper>
      <Login url={`${process.env.API_URL}/auth/google`} />
    </PageWrapper>
  );
}
