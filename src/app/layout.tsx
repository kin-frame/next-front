import type { Metadata } from "next";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { userQuery } from "@/services/user/query";
import { JwtPayload } from "@/shared/config/roles";
import theme from "@/shared/mui/theme";
import parseJwt from "@/shared/util/parseJwt";
import Body from "./_components/Body";
import { getQueryClient } from "./_query/get-query-client";
import Providers from "./_query/providers";

const pretendardGOV = localFont({
  src: "./_font/PretendardGOVVariable.ttf",
});

export const metadata: Metadata = {
  title: "Kinframes",
  description: "가족과 함께하는 생생한 기억들",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const { status, role } = parseJwt<JwtPayload>(accessToken);

  return (
    <html lang="en" className={`${pretendardGOV.className}`}>
      <Providers>
        <HydrationBoundary state={await prefetchData()}>
          <ThemeProvider theme={theme}>
            <AppRouterCacheProvider>
              <CssBaseline />
              <Body isLogin={!!accessToken} status={status} role={role}>
                {children}
              </Body>
            </AppRouterCacheProvider>
          </ThemeProvider>
        </HydrationBoundary>
      </Providers>
    </html>
  );
}

async function prefetchData() {
  const cookieStore = await cookies();
  const queryClient = getQueryClient();

  await Promise.all([
    await queryClient.prefetchQuery({
      ...userQuery.getCurrentUserInfo({ cookie: cookieStore.toString() }),
    }),
  ]);

  return dehydrate(queryClient);
}
