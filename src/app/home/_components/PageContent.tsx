"use client";
import Link from "next/link";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { Button, Grid, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { userQuery } from "@/services/user/query";
import theme from "@/shared/mui/theme";
import UserInfo from "./UserInfo";

export default function PageContent() {
  const { data: userData } = useQuery({
    ...userQuery.getCurrentUserInfo({}),
  });

  const isAdmin = userData?.role === "ADMIN";

  return (
    <>
      <UserInfo />
      <Grid size={12}>
        <Stack
          sx={{
            gap: "16px",
            [theme.breakpoints.down("lg")]: {
              gap: "8px",
            },
          }}
        >
          <Button
            startIcon={<FolderOutlinedIcon />}
            variant="outlined"
            color="inherit"
            LinkComponent={Link}
            href="/file"
          >
            내 파일 확인하기
          </Button>
          {isAdmin && (
            <Button
              startIcon={<AdminPanelSettingsOutlinedIcon />}
              variant="outlined"
              LinkComponent={Link}
              href="/admin"
            >
              관리자 페이지로 이동
            </Button>
          )}
        </Stack>
      </Grid>
    </>
  );
}
