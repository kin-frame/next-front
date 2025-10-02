export type JwtPayload = {
  id: number;
  email: string;
  /**
   * user.entity.ts 참고
   */
  status: "PENDING" | "SUBMIT" | "APPROVED" | "REJECTED";
  role: ROLES;
  iat: number;
  exp: number;
};

export enum ROLES {
  ADMIN = "ADMIN",
  USER = "USER",
  GUEST = "GUEST",
}

export const accessRules = [
  // 관리자용
  { pathPrefix: "/admin", allowed: [ROLES.ADMIN], redirect: "/home" },
  // 로그인
  { pathPrefix: "/login", allowed: [] },
  // 회원가입 안내
  { pathPrefix: "/signup", allowed: [ROLES.GUEST] },

  // 인증 토큰 받아오는 화면 - 모든 사용자 접속 가능
  { pathPrefix: "/auth", allowed: [ROLES.ADMIN, ROLES.USER, ROLES.GUEST] },

  { pathPrefix: "/file", allowed: [ROLES.ADMIN, ROLES.USER], redirect: "/" },
  { pathPrefix: "/home", allowed: [ROLES.ADMIN, ROLES.USER], redirect: "/" },
];
