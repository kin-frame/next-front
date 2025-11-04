import api, { PageableReqDto, PageableResDto } from "@/shared/api";

function getAdminUserList({
  query,
}: {
  query: PageableReqDto & {
    keywordType: string;
    keyword: string;
  };
}) {
  return api.get<
    null,
    PageableResDto<{
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
