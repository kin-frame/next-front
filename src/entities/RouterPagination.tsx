"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Pagination, PaginationProps } from "@mui/material";

export default function RouterPagination({
  count,
}: Pick<PaginationProps, "count">) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const page = Number(searchParams.get("page") || "1");

  return (
    <Pagination
      disabled={isPending}
      page={page}
      count={count}
      onChange={(event, page) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", `${page}`);
        startTransition(() => {
          router.push(`${pathname}?${params.toString()}`, { scroll: false });
        });
      }}
    />
  );
}
