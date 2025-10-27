import api from "@/shared/api";

function getCurrentUserInfo({ cookie }: { cookie?: string }) {
  const config = cookie
    ? {
        headers: {
          cookie,
        },
      }
    : undefined;

  return api.get<null, { name: string; email: string; role: string }>(
    "/user/me",
    config
  );
}

export const userApi = { getCurrentUserInfo };
