import axios from "axios";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 환경변수 기반
  withCredentials: true, // 쿠키/세션 필요 시
  timeout: 5000,
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    // 예: 토큰 자동 주입
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response.data, // data만 반환
  (error) => {
    // 예: 토큰 만료 처리
    if (error.response?.status === 401) {
      console.warn("인증 오류");
    }
    return Promise.reject(error);
  }
);

export default api;
