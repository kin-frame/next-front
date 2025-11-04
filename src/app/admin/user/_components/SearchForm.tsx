import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button, Stack, TextField } from "@mui/material";

import { adminApi } from "@/services/admin";
import { UnwrapApiRequest } from "@/shared/api";

export default Object.assign(
  function SearchForm() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const { handleSubmit, register } =
      useForm<UnwrapApiRequest<typeof adminApi.getAdminUserList>["query"]>();

    return (
      <Stack
        component="form"
        onSubmit={handleSubmit((data) => {
          const newSearchParams = new URLSearchParams(searchParams);
          Object.entries(data).forEach(([field, value]) => {
            if (!String(value)) return;
            if (Array.isArray(value)) {
              value.forEach((v) => {
                if (String(v)) {
                  newSearchParams.set(field, String(v));
                }
              });
            } else {
              newSearchParams.set(field, String(value));
            }
          });

          router.push(`?${newSearchParams.toString()}`);
        })}
        sx={{
          mb: "16px",
          gap: "8px",
        }}
      >
        <TextField {...register("keyword")} size="small" placeholder="검색어" />
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Button type="submit" size="small">
            검색
          </Button>
        </Stack>
      </Stack>
    );
  },
  {
    useSearch: function () {
      const searchParams = useSearchParams();
      const obj: Record<string, string | string[]> = {};

      for (const [key, value] of searchParams.entries()) {
        if (obj[key]) {
          obj[key] = Array.isArray(obj[key])
            ? [...obj[key], value]
            : [obj[key], value];
        } else {
          obj[key] = value;
        }
      }

      return obj;
    },
  }
);
