"use client";
import { Stack } from "@mui/material";

import UserContext from "@/shared/context/UserContext";
import Footer from "./Footer";
import Header from "./Header";

type BodyProps = React.PropsWithChildren<{
  isLogin: boolean;
}>;

export default function Body({ isLogin, children }: BodyProps) {
  return (
    <UserContext.Provider value={{ isLogin }}>
      <Stack component="body" gap="8px">
        <Header />
        {children}
        <Footer />
      </Stack>
    </UserContext.Provider>
  );
}
