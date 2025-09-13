"use client";

import Image from "next/image";
import Link from "next/link";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import {
  Button,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import theme from "@/shared/mui/theme";

interface LoginProps {
  url: string;
}

export default function Login({ url }: LoginProps) {
  return (
    <Paper
      component={Stack}
      elevation={4}
      sx={{
        alignItems: "center",
        justifyContent: "center",

        width: "640px",
        gap: "40px",
        py: "64px",

        [theme.breakpoints.down("sm")]: {
          width: "360px",
          gap: "24px",
          py: "40px",
        },
      }}
    >
      <Typography fontWeight={700} fontSize={24}>
        KINFRAMES
        <Tooltip title="ㅁㅁㅁ">
          <IconButton>
            <HelpOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Typography>
      <Typography fontSize={16} textAlign="center">
        구글 계정으로 로그인하거나,
        <br />
        새로 회원가입을 진행해주세요.
      </Typography>
      <Typography fontSize={14} color="textSecondary" textAlign="center">
        (회원가입 신청 후, 관리자의 승인이 필요합니다.)
      </Typography>
      <Button
        variant="outlined"
        color="inherit"
        LinkComponent={Link}
        href={url}
        startIcon={
          <Image
            src="/icon/google.svg"
            alt=""
            aria-hidden
            width={16}
            height={16}
          />
        }
        sx={{
          width: "200px",
          lineHeight: "150%",
        }}
      >
        구글 계정으로 인증
      </Button>
    </Paper>
  );
}
