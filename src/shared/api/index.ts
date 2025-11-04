import axios, { isAxiosError } from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_URL, // 환경변수 기반
  withCredentials: true, // 쿠키/세션 필요 시
  timeout: 5000,
});

export function isApiError<T>(error: unknown) {
  return isAxiosError<{
    error: string;
    message: { field: keyof T; message: string }[];
  }>(error);
}

// 요청 인터셉터
// api.interceptors.request.use(
//   (config) => {
//     // 예: 토큰 자동 주입
//     const token =
//       typeof window !== "undefined" ? localStorage.getItem("token") : null;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response.data // data만 반환
);

export interface PageableReqDto {
  page: number;
  size: number;
  sort: string[];
}

export interface PageableResDto<T> {
  content: T[];
  page: number;
  size: number;
  totalPages: number;
  totalCount: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnwrapApiResponse<T> = T extends (...args: any) => Promise<infer R>
  ? R
  : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnwrapApiRequest<T> = T extends (...args: infer R) => any
  ? R[0]
  : never;

export default api;
