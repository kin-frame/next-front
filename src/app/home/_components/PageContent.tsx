"use client";
import Link from "next/link";
import { ReactNode } from "react";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import { Grid, Paper, Stack, Typography } from "@mui/material";
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
        <Typography fontWeight={700} fontSize={18}>
          바로가기
        </Typography>
        <Stack
          sx={{
            mt: "4px",
            gap: "16px",
          }}
        >
          <QuickLink
            href="/file"
            icon={<FolderOutlinedIcon sx={{ fontSize: 24 }} />}
            title="내 파일"
            description="업로드한 파일을 확인하고 관리해요"
          />

          <QuickLink
            href="/chat"
            icon={<TextsmsOutlinedIcon sx={{ fontSize: 24 }} />}
            title="채팅(개발중)"
            description="다른 사용자와 대화할 수 있어요"
          />

          {isAdmin && (
            <QuickLink
              href="/admin"
              icon={<AdminPanelSettingsOutlinedIcon sx={{ fontSize: 24 }} />}
              title="관리자 페이지"
              description="사용자와 디렉토리를 관리해요"
            />
          )}
        </Stack>
      </Grid>
    </>
  );
}

type QuickLinkProps = {
  href: string;
  icon: ReactNode;
  title: string;
  description?: string;
};

function QuickLink({ href, icon, title, description }: QuickLinkProps) {
  return (
    <Grid
      size={{
        xs: 4,
        sm: 4,
        md: 4,
        lg: 6,
        xl: 6,
      }}
    >
      <Paper
        elevation={2}
        component={Link}
        href={href}
        aria-label={title}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          textDecoration: "none",
          p: "16px",
          [theme.breakpoints.down("lg")]: { p: "12px" },
          transition: "box-shadow .2s ease, transform .1s ease",
          "&:hover": { boxShadow: 4 },
          "&:active": { transform: "translateY(1px)" },
        }}
      >
        {icon}
        <Stack sx={{ gap: "2px" }}>
          <Typography fontWeight={600}>{title}</Typography>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </Stack>
      </Paper>
    </Grid>
  );
}
