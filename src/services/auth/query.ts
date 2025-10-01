import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import api from "@/shared/api";

export function useLogoutMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: () => api.post(`/auth/logout`),
    onSuccess: () => {
      router.replace("/login");
    },
  });
}
