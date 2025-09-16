import type { Metadata } from "next";
import localFont from "next/font/local";
import { Stack } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import theme from "@/shared/mui/theme";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import { getQueryClient } from "./_query/get-query-client";
import Providers from "./_query/providers";

const pretendardGOV = localFont({
  src: "./_font/PretendardGOVVariable.ttf",
});

export const metadata: Metadata = {
  title: "Kinframes",
  description: "가족과 함께하는 생생한 기억들",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getQueryClient();

  return (
    <html lang="en">
      <Providers>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ThemeProvider theme={theme}>
            <AppRouterCacheProvider>
              <CssBaseline />
              <Stack
                component="body"
                gap="8px"
                className={`${pretendardGOV.className}`}
              >
                <Header />
                {children}
                <Footer />
              </Stack>
            </AppRouterCacheProvider>
          </ThemeProvider>
        </HydrationBoundary>
      </Providers>
    </html>
  );
}
