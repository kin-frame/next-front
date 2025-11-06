import api, { PageableReqDto, PageableResDto } from "@/shared/api";

function getAdminUserList({
  query,
}: {
  query: PageableReqDto & {
    keywordType: string;
    keyword: string;
  };
}) {
  return api.get<null, PageableResDto<User>>("/admin/user", {
    params: query,
    paramsSerializer: {
      indexes: null,
    },
  });
}

function getAdminUserInfo({
  path,
}: {
  path: {
    id: number;
  };
}) {
  return api.get<null, User>(`/admin/user/${path.id}/info`);
}

function updateUserFileLimit({
  path,
  body,
}: {
  path: {
    id: number;
  };
  body: UpdateAdminUserInfoReqDto;
}) {
  return api.patch<null, User>(`/admin/user/${path.id}/info`, body);
}

type UpdateAdminUserInfoReqDto = {
  /** 허용 파일 개수 */
  fileCount: number;
  /** 최대 허용 파일 크기(바이트) */
  maxFileSize: number;
};

type User = {
  id: number;
  email: string;
  name: string;
  picture: string;
  status: string;
  role: string;
  fileCount: number;
  maxFileSize: number;
  message: string;
  createdAt: string;
  updatedAt: string;
  lastLoginedAt: string;
  lastLoginedIp: string;
  sessionId: null;
};

type UpdateUserRoleReqDto = {
  /** 사용자 권한 ADMIN | USER | GUEST */
  role: string;
};

export const adminApi = {
  getAdminUserList,
  getAdminUserInfo,
  updateUserFileLimit,
  updateUserRole({
    path,
    body,
  }: {
    path: {
      id: number;
    };
    body: UpdateUserRoleReqDto;
  }) {
    return api.patch<null, User>(`/admin/user/${path.id}/role`, body);
  },
};
