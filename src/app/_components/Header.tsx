"use client";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Drawer, IconButton, Stack, Typography } from "@mui/material";

import { useLogoutMutation } from "@/services/auth/query";
import theme from "@/shared/mui/theme";

export default function Header() {
  return (
    <Stack
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        bgcolor: "white",

        alignItems: "center",
        boxShadow: theme.shadows[1],
      }}
    >
      <Stack
        sx={{
          width: "100%",
          maxWidth: "1200px",
          py: "16px",
          [theme.breakpoints.down("lg")]: {
            px: "8px",
            py: "8px",
          },
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <SideMenuButton />
        <Typography
          fontWeight={700}
          fontSize={24}
          sx={{
            mx: "8px",
          }}
        >
          Kinframes
        </Typography>
        <Stack
          sx={{
            flexDirection: "row",
            ml: "auto",
          }}
        >
          <LogoutButton />
        </Stack>
      </Stack>
    </Stack>
  );
}

function SideMenuButton() {
  const [open, setOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(open);
    };

  return (
    <>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuOutlinedIcon />
      </IconButton>
      <Drawer anchor={"left"} open={open} onClose={toggleDrawer(false)}>
        <Stack sx={{ gap: "8px", p: "8px" }}>About us</Stack>
      </Drawer>
    </>
  );
}

function LogoutButton() {
  const { mutate: logout } = useLogoutMutation();

  return (
    <IconButton
      aria-label="로그아웃"
      onClick={() => {
        logout();
      }}
    >
      <LogoutIcon />
    </IconButton>
  );
}
