"use client";
import { Stack } from "@mui/material";

import { ROLES } from "@/shared/config/roles";
import UserContext from "@/shared/context/UserContext";
import Footer from "./Footer";
import GlobalModal from "./GlobalModal";
import Header from "./Header";

type BodyProps = React.PropsWithChildren<{
  isLogin: boolean;
  status: string;
  role: ROLES;
}>;

export default function Body({ isLogin, status, role, children }: BodyProps) {
  return (
    <UserContext.Provider value={{ isLogin, status, role }}>
      <Stack
        component="body"
        gap="8px"
        sx={{
          minHeight: "100vh",
        }}
      >
        <Header />
        {children}
        <Footer />
        <GlobalModal modalType="primary" />
        <GlobalModal modalType="secondary" />
        <GlobalModal modalType="tertiary" />
      </Stack>
    </UserContext.Provider>
  );
}
