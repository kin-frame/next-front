"use client";
import { useForm } from "react-hook-form";
import { Button, Stack } from "@mui/material";

import { useGlobalModal } from "@/app/_atoms/globalModal";

export default function PageContent() {
  const { handleSubmit } = useForm();

  const { open } = useGlobalModal();

  return (
    <Stack sx={{ gap: "4px" }}>
      <Button
        onClick={() => {
          open({
            title: "대화방 생성하기",
            content: <CreateChatRoom />,
            form: true,
            onSubmit: handleSubmit((data) => {
              console.log(data);
            }),
          });
        }}
      >
        대화방 생성하기
      </Button>
    </Stack>
  );
}

function CreateChatRoom() {
  return <Stack>CreateChatRoom</Stack>;
}
