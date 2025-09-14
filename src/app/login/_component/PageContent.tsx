"use client";

import Image from "next/image";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import {
  Button,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import theme from "@/shared/mui/theme";

interface PageContentProps {
  url: string;
}

export default function PageContent({ url }: PageContentProps) {
  return (
    <Grid
      size={12}
      component={Stack}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        gap: "40px",
        [theme.breakpoints.down("lg")]: {
          gap: "24px",
        },
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Typography fontWeight={700} fontSize={24}>
          KINFRAMES
        </Typography>
        <Tooltip title="Kin (가족) + Frame (사진/영상의 틀)을 의미합니다.">
          <IconButton>
            <HelpOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Stack>
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
        LinkComponent="a"
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
    </Grid>
  );
}
