"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

import { useGlobalModal } from "@/app/_atoms/globalModal";
import api from "@/shared/api";
import { parseJSON } from "@/shared/util/common";

export default function PageContent() {
  const { handleSubmit } = useForm();

  const { open } = useGlobalModal();
  const [text, setText] = useState("");

  const { mutate } = useMutation({
    mutationFn: () =>
      api.get<null, ReadableStream>("/health/stream", {
        responseType: "stream",
        adapter: "fetch",
      }),
    onSuccess: async (data) => {
      const reader = data.pipeThrough(new TextDecoderStream()).getReader();

      while (true) {
        const { value, done } = await reader.read();
        const lines = value?.split("\n");
        const dataLine = lines?.find((l) => l.startsWith("data: "))?.slice(6);
        const data = parseJSON<{ char: string }>(dataLine || "");

        if (done) break;

        setText((prev) => `${prev}${data?.char || ""}`);
      }
    },
  });

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
      <Button
        onClick={() => {
          mutate();
        }}
      >
        체크
      </Button>
      <Typography
        sx={{
          whiteSpace: "pre-line",
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
}

function CreateChatRoom() {
  return <Stack>CreateChatRoom</Stack>;
}
