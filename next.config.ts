import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kinframes.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**", // 모든 경로 허용
      },
    ],
  },
};

export default nextConfig;
