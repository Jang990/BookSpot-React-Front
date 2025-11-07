import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
  /* config options here */
  // reactStrictMode: false,
  images: {
    domains: ["contents.kyobobook.co.kr"],
  },
};

// 2. 블로그에서 본 PWA 설정을 정의합니다.
const pwaConfig = withPWA({
  dest: "public", // 서비스 워커 파일 등이 생성될 위치
  register: true, // 서비스 워커 즉시 등록
  disable: process.env.NODE_ENV === "development", // npm run dev 환경에선 PWA 비활성화

  // vercel에 배포된 새 버전이 감지되면 앱을 재시작하지 않아도 볼 수 있게 바로 바꿔줌
  workboxOptions: {
    skipWaiting: true,
    clientsClaim: true,
  },
});

export default pwaConfig(nextConfig);
