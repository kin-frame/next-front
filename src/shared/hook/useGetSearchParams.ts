import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

// NOTE: query params를 받는 검색형 API에서 form과 query를 맞추기 위해 사용.
export default function useGetSearchParams() {
  const searchParams = useSearchParams();

  const getSearchParams = useCallback(
    function (data: object) {
      const newSearchParams = new URLSearchParams(searchParams);

      Object.entries(data).forEach(([field, value]) => {
        if (!String(value)) {
          newSearchParams.delete(field);
        } else if (Array.isArray(value)) {
          value.forEach((v) => {
            if (String(v)) {
              newSearchParams.set(field, String(v));
            }
          });
        } else {
          newSearchParams.set(field, String(value));
        }
      });

      return newSearchParams;
    },
    [searchParams]
  );

  return [searchParams, getSearchParams] as const;
}
