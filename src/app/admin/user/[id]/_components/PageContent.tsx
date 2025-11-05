"use client";
import { useParams } from "next/navigation";
import { Stack } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";

import { adminMutation, adminQuery } from "@/services/admin/query";

export default function PageContent() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const { data } = useQuery({
    ...adminQuery.getAdminUserInfo({ path: { id } }),
  });

  const {} = useMutation({
    ...adminMutation.updateUserFileLimit,
  });

  return <Stack>{data?.email}</Stack>;
}
