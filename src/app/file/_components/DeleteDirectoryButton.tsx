"use client";
import { useRouter, useSearchParams } from "next/navigation";
import FolderDeleteOutlinedIcon from "@mui/icons-material/FolderDeleteOutlined";
import { IconButton } from "@mui/material";
import { useAtomValue } from "jotai";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useGlobalModal } from "@/app/_atoms/globalModal";
import { directoryMutation, directoryQuery } from "@/services/directory/query";
import { listTypeAtom } from "../_atoms/listType";

export default function DeleteDirectoryButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const listType = useAtomValue(listTypeAtom);
  const { open, close } = useGlobalModal();

  const { data: rootData } = useQuery({
    ...directoryQuery.getRootDirectory(),
  });

  const directoryId =
    Number(searchParams.get("directoryId")) || rootData?.id || 0;

  const { data: infoData } = useQuery({
    ...directoryQuery.getDirectoryInfo({
      query: {
        directoryId,
      },
    }),
    placeholderData: keepPreviousData,
    enabled: !!directoryId,
  });

  const { mutate: mutateDelete } = useMutation({
    ...directoryMutation.deleteDirectory,
    onSuccess: () => {
      if (!infoData?.parentId) return;
      close();
      queryClient.invalidateQueries({
        queryKey: directoryQuery.getDirectoryChildren({
          query: { directoryId: infoData?.parentId },
        }).queryKey,
      });
      router.replace(`/file?directoryId=${infoData?.parentId}`);
    },
  });

  // 그리드형 화면에서는 폴더 삭제하지 않음.
  if (listType === "grid") return null;
  // 루트 디렉토리에서는 버튼 숨김
  if (Number(searchParams.get("directoryId")) === rootData?.id) return null;

  return (
    <IconButton
      aria-label="디렉토리 삭제"
      sx={{ flex: "0 0 auto" }}
      color="error" // danger
      onClick={() => {
        open({
          title: "폴더 삭제하기",
          subTitle: "복구 시 관리자에게 문의해주세요.",
          isConfirm: true,
          confirmTitle: "삭제",
          confirmColor: "error",
          onConfirm() {
            mutateDelete({ body: { id: directoryId } });
          },
          disableNativeClose: true,
        });
      }}
    >
      <FolderDeleteOutlinedIcon />
    </IconButton>
  );
}
