"use client";
import { useSearchParams } from "next/navigation";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import { IconButton, TextField } from "@mui/material";
import { useAtomValue } from "jotai";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import { useGlobalModal } from "@/app/_atoms/globalModal";
import { directoryQuery } from "@/services/directory/query";
import api, { isApiError } from "@/shared/api";
import { listTypeAtom } from "../_atoms/listType";

type CreateRequestDto = { directoryName: string };

export default function CreateDirectoryButton() {
  const searchParams = useSearchParams();
  const listType = useAtomValue(listTypeAtom);
  const { open, close, loading } = useGlobalModal();

  const formMethod = useForm<CreateRequestDto>();
  const { handleSubmit, setError, reset } = formMethod;

  const { data: rootData } = useQuery({
    ...directoryQuery.getRootDirectory(),
  });

  const directoryId =
    Number(searchParams.get("directoryId")) || rootData?.id || 0;

  const { refetch } = useQuery({
    ...directoryQuery.getDirectoryChildren({ query: { directoryId } }),
    placeholderData: keepPreviousData,
    enabled: !!directoryId,
  });

  const { mutate: mutateCreate } = useMutation({
    mutationFn: ({ body }: { body: CreateRequestDto }) =>
      api.post("/directory", {
        directoryName: body.directoryName,
        parentId: directoryId,
      }),
    onSuccess: () => {
      loading(false);
      close();
      refetch();
    },
    onError: (error) => {
      if (isApiError<CreateRequestDto>(error)) {
        error.response?.data.message?.forEach((err) => {
          setError(err.field, { message: err.message });
        });
      }
      loading(false);
    },
  });

  // 그리드형 화면에서는 폴더 생성하지 않음.
  if (listType === "grid") return null;

  return (
    <IconButton
      aria-label="디렉토리 추가"
      sx={{ flex: "0 0 auto" }}
      color="primary"
      onClick={() => {
        open({
          title: "폴더 생성하기",
          content: (
            <FormProvider {...formMethod}>
              <CreateDirectory />
            </FormProvider>
          ),
          isConfirm: true,
          confirmTitle: "생성",
          onClose: () => {
            reset();
          },
          form: true,
          onSubmit: handleSubmit((data) => {
            loading(true);
            mutateCreate({
              body: {
                directoryName: data.directoryName,
              },
            });
          }),
          disableNativeClose: true,
        });
      }}
    >
      <CreateNewFolderOutlinedIcon />
    </IconButton>
  );
}

function CreateDirectory() {
  const { control } = useFormContext<CreateRequestDto>();

  return (
    <Controller
      control={control}
      name="directoryName"
      defaultValue=""
      rules={{
        required: "폴더 이름을 입력해주세요.",
      }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          error={!!error}
          helperText={error?.message}
          size="small"
          aria-label="폴더 이름"
          placeholder="폴더 이름을 입력해주세요"
        />
      )}
    />
  );
}
