import type { Metadata } from "next";
import localFont from "next/font/local";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import theme from "@/shared/mui/theme";
import Header from "./_components/Header";

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
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <AppRouterCacheProvider>
          <CssBaseline />
          <body className={`${pretendardGOV.className}`}>
            <Header />
            {children}
          </body>
        </AppRouterCacheProvider>
      </ThemeProvider>
    </html>
  );
}
