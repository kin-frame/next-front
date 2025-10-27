"use client";
import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import { Grid, Paper, Typography } from "@mui/material";

import theme from "@/shared/mui/theme";

export default function PageContent() {
  return (
    <>
      <Grid size={12}>
        <Typography>주요 기능</Typography>
      </Grid>
      <LinkItem href="/admin/user">
        <PeopleOutlinedIcon />
        <Typography>사용자 정보</Typography>
      </LinkItem>
      <LinkItem href="/admin/directory">
        <FolderOpenOutlinedIcon />
        <Typography>디렉토리 및 파일 정보</Typography>
      </LinkItem>
    </>
  );
}

function LinkItem({ href, children }: PropsWithChildren<LinkProps>) {
  return (
    <Grid
      size={{
        xs: 2,
        sm: 2,
        md: 2,
        lg: 3,
        xl: 3,
      }}
    >
      <Paper
        elevation={2}
        component={Link}
        href={href}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          textDecoration: "none",

          p: "24px",
          [theme.breakpoints.down("lg")]: {
            p: "16px",
          },
        }}
      >
        {children}
      </Paper>
    </Grid>
  );
}
