import api, { PagebleResDto } from "@/shared/api";

function getAdminUserList({
  query,
}: {
  query: { page: number; size: number; sort: string[] };
}) {
  return api.get<
    null,
    PagebleResDto<{
      createdAt: string;
      email: string;
      fileCount: number;
      id: number;
      lastLoginedAt: string;
      lastLoginedIp: string;
      maxFileSize: number;
      message: string;
      name: string;
      picture: string;
      role: string;
      sessionId: null;
      status: string;
      updatedAt: string;
    }>
  >("/admin/user", {
    params: query,
    paramsSerializer: {
      indexes: null,
    },
  });
}

export const adminApi = { getAdminUserList };
